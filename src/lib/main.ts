import { render } from '@nexrender/core';
import ffmpeg from 'fluent-ffmpeg';
import path from 'path';
import myjob from './myjob.json';



const sourceVideoPath = 'file:///Users/playra/nexrender-server/video/4.mp4' // lipsync video
const video02 = 'file:///Users/playra/nexrender-server/video/bg-soft.mp4' // background video
const audio01 = 'file:///Users/playra/nexrender-server/audio/news2.mp3' // audio

const main = async () => {
    try {
        const binaryPath = process.env.AERENDER_BINARY;
        console.log(binaryPath, 'binaryPath');
        if (!binaryPath) {
            return Promise.reject(new Error('You should provide a proper path to After Effects\' "aerender" binary'));
        }

        const result = await render({
            template: {
                src: "file:///Users/playra/nexrender-server/template/NEURONEWS/neuronews.aep",
                composition: "Instagram_Story",
                outputModule: "H.264 - Match Render Settings - 15 Mbps",
                outputExt: "mp4",
                settingsTemplate: "Best Settings"
            },
            assets: [
                {
                    type: "data",
                    composition: "Text_02",
                    layerName: "Text_02",
                    property: "Source Text",
                    value: "GOOGLE"
                },
                {
                    type: "video",
                    src: sourceVideoPath,
                    layerName: "Video_01"
                },
                {
                    type: "video",
                    src: video02,
                    layerName: "Video_02"
                },
                {
                    type: "audio",
                    src: audio01,
                    layerName: "Audio_01"
                }
            ],
            actions: {
                postrender: [
                    {
                        module: "@nexrender/action-encode",
                        preset: "mp4",
                        output: "/Users/playra/nexrender-server/output/output.mp4"
                    }
                ]
            }
        }, {
            binary: binaryPath
        });

    if (!result) {
        return Promise.reject(new Error('Render failed'));
    }

        console.log('Render finished:', result);
    
        return result;
    } catch (error) {
        console.error('Error rendering:', error);
    }   
};

main().catch(console.error);

const targetVideoPath = '/Users/playra/nexrender-server/output/output.mp4';
const outputVideoPath = '/Users/playra/nexrender-server/output/newoutput.mp4';

  // Получение длительности исходного видео
ffmpeg.ffprobe(sourceVideoPath, (err, metadata) => {
    if (err) {
        console.error('Error getting video duration:', err);
        return;
    }

    const duration = metadata.format.duration;
    console.log('Duration of source video:', duration);

    if (!duration) {
    console.error('Error getting video duration:', err);
       return;  
    }

    // Обрезка целевого видео до длительности исходного видео
  ffmpeg(targetVideoPath)
        .setStartTime(0)
        .setDuration(duration)
        .output(outputVideoPath)
        .on('end', () => {
            console.log('Video has been trimmed successfully');
        })
        .on('error', (err) => {
            console.error('Error trimming video:', err);
        })
        .run();
});