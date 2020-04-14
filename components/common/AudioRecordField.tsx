import React from "react";
import { ReactMic, ReactMicProps, ReactMicStopEvent } from "react-mic";
import { Button } from "semantic-ui-react";

interface IAudioRecordProps extends ReactMicProps {
    onChange(audioBlob: Blob): void;
    playbackAudioUrl?: string;
}

function useAudioRecordField() {
    const [recording, setRecord] = React.useState(false);

    const record = React.useCallback(() => setRecord(true), [recording]);

    const stop = React.useCallback(() => setRecord(false), [recording]);

    const play = React.useCallback(
        (playbackUrl: string) => {
            const track = new Audio(playbackUrl);
            track.play();
        },
        [recording]
    );

    return { recording, record, stop, play };
}

const AudioRecordField: React.FC<IAudioRecordProps> = (props) => {
    const { recording, record, stop, play } = useAudioRecordField();
    const [playbackUrl, setPlaybackUrl] = React.useState(props.playbackAudioUrl);

    const handleStop = (event: ReactMicStopEvent) => {
        props.onChange(event.blob);
        setPlaybackUrl(URL.createObjectURL(event.blob));
        stop();
    };

    return (
        <div className="record">
            <ReactMic
                record={recording}
                className="sound-wave"
                strokeColor="green"
                backgroundColor="#ffffff"
                onStop={handleStop}
            />
            {recording ? (
                <Button
                    icon="stop"
                    content="Stop"
                    type="button"
                    color="red"
                    onClick={stop}
                />
            ) : (
                <Button
                    icon="record"
                    type="button"
                    content="Record"
                    onClick={record}
                />
            )}
            {playbackUrl ? (
                <Button
                    icon="play"
                    content="Play"
                    type="button"
                    onClick={() => play(playbackUrl)}
                />
            ) : undefined}
            <style jsx>{`
                .record {
                    width: 100%;
                    overflow-x: hidden;
                }
                .sound-wave {
                    display: block;
                }
            `}</style>
        </div>
    );
};

export default AudioRecordField;
