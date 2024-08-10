const path = require("path");
const fs = require("fs");
const AWS = require('aws-sdk');

const { Movie } = require("../../models");

const Logger = require("../../lib/logger");


// Configure the AWS region
AWS.config.update({ region: 'us-east-2' });

// Create S3 service object
const s3 = new AWS.S3({
  accessKeyId: 'AKIAQ3EGROPMQ225V66G',
  secretAccessKey: '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',
});

const syncServerMoviesToDatabase = async (req, res) => {

    try {
      const params = {
        Bucket: 'haniflix-data-bucket',
        Prefix: 'cdn.haniflix.com/movies/' // Adjust this based on your bucket structure
      };
  
      const s3Objects = await s3.listObjectsV2(params).promise();
      console.log(s3Objects,"whats here")
      for (const s3Object of s3Objects.Contents) {
        const movieFileName = path.basename(s3Object.Key);
        if (s3Object.Key.endsWith('/')) {
          Logger.info(movieFileName + " is a folder, skipping...");
          continue;
        }
  
        let matchRes = movieFileName.match(/^(.+?)\.(\d{4})\./);
  
        if (!matchRes) {
          matchRes = movieFileName.match(/^(.+?)\s+\(?(\d{4})\)?/);
        }
        if (!matchRes) {
          matchRes = movieFileName.match(/^(.+?)\.(720p|1080p|BluRay|BRRip|HDRip|x264|X264|AAC|mkv|mp4)/);
        }
  
        if (!matchRes) {
          Logger.info("No Match result for file " + movieFileName);
          continue;
        }
  
        let [title, year] = matchRes.slice(1, 3);
        title = title.replace(/\./g, ' ');
  
        let existingMovie = await Movie.findOne({
          title: title,
          year: year || '',
        });
  
        if (!existingMovie) {
          existingMovie = await Movie.findOne({
            video: 'https://cdn.haniflix.com/' + s3Object.Key
          });
        }
  
        if (existingMovie) {
          Logger.info("Movie exists " + `${title} (${year})` + " skipping ");
          continue;
        }
  
        const movie = new Movie({
          title: title,
          video: 'https://cdn.haniflix.com/' + s3Object.Key,
          year: year,
        });
        await movie.save();
      }
  
      res.status(200).send({
        message: "Movies synced successfully",
      });
    } catch (error) {
      Logger.error("Error syncing movies: " + error);
      res.status(500).send({
        message: "Error syncing movies",
        error,
      });
    }
};

module.exports = syncServerMoviesToDatabase;
