import React, { useState, useEffect, useRef } from 'react';
import { LinearProgress } from '@material-ui/core';

const Recorder = ({ isRecording, recordingTime, title }) => {
    const [mediaRecorder, setMediaRecorder] = useState(null);
    const [progress, setProgress] = useState(0);
    const recordingTimeoutRef = useRef(null);
    const recordingStartTimeRef = useRef(null);

    useEffect(() => {
        // Request microphone access and setup media recorder
        navigator.mediaDevices.getUserMedia({ audio: true })
            .then(stream => {
                const recorder = new MediaRecorder(stream);
                setMediaRecorder(recorder);

                const audioChunks = [];
                recorder.ondataavailable = event => {
                    audioChunks.push(event.data);
                };

                recorder.onstop = () => {
                    const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
                    const audioUrl = URL.createObjectURL(audioBlob);
                    const timestamp = Date.now();
                    downloadAudio(audioUrl, `${title}-${timestamp}`);
                };
            })
            .catch(error => {
                console.error("Microphone access denied:", error);
            });
    }, [title]);

    useEffect(() => {
        if (isRecording && mediaRecorder) {
            mediaRecorder.start();
            recordingStartTimeRef.current = Date.now();
            updateProgress();
            recordingTimeoutRef.current = setTimeout(() => {
                mediaRecorder.stop();
            }, recordingTime * 1000);
        } else if (mediaRecorder) {
            mediaRecorder.stop();
            clearTimeout(recordingTimeoutRef.current);
            setProgress(0);
        }
    }, [isRecording, mediaRecorder, recordingTime]);

    const updateProgress = () => {
        const interval = setInterval(() => {
            const elapsedTime = (Date.now() - recordingStartTimeRef.current) / 1000;
            const newProgress = (elapsedTime / recordingTime) * 100;
            setProgress(newProgress);
            if (newProgress >= 100 || !isRecording) {
                clearInterval(interval);
            }
        }, 100);
    };

    const downloadAudio = (audioUrl, fileName) => {
        const link = document.createElement('a');
        link.href = audioUrl;
        link.download = `${fileName}.wav`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '20px',
            backgroundColor: '#f0f0f0'
        }}>
            <LinearProgress
                variant="determinate"
                value={progress}
                style={{
                    width: '80%',
                    marginBottom: '20px'
                }}
            />
            {/* Other UI elements */}
        </div>
    );
};

export default Recorder;
