import React, { useEffect, useRef } from "react";

const CustomReactPlayer = React.forwardRef(
    (
        {
            url,
            controls,
            onEnded,
            onDuration,
            onProgress,
            onPause,
            playing,
            width,
            height,
            playbackRate,
            progressInterval,
            config,
        },
        ref
    ) => {
        const videoRef = useRef(null);

        React.useImperativeHandle(ref, () => ({
            seekTo: (time) => {
                if (videoRef.current) {
                    videoRef.current.currentTime = time;
                }
            },
        }));

        useEffect(() => {
            // Ensure that the ref is properly assigned
            if (ref) {
                ref.current = videoRef.current;
            }
        }, [ref]);

        const handleEnded = () => {
            if (onEnded) {
                onEnded?.();
            }
        };

        const handleDuration = (e) => {
            if (onDuration) {
                onDuration?.(e.target.duration);
            }
        };

        const handleProgress = (e) => {
            if (onProgress) {
                onProgress?.({
                    playedSeconds: e.target.currentTime,
                });
            }
        };

        const handlePause = () => {
            if (onPause) {
                onPause?.();
            }
        };

        return (
            <video
                ref={videoRef}
                src={url}
                controls={controls}
                onEnded={handleEnded}
                onDurationChange={handleDuration}
                onTimeUpdate={handleProgress}
                onPause={handlePause}
                autoPlay={playing}
                style={{
                    height,
                    width
                }}
                playbackrate={playbackRate}
                progressinterval={progressInterval}
                controlsList="nodownload" // Add controlsList prop here
                buffered={5}
                {...config}
            />
        );
    }
);

export default CustomReactPlayer;
