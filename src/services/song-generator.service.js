import googleTTS from 'google-tts-api';
import downloadFile from 'download-file';
import { exec } from 'child_process';
import fs from 'fs';

class SongGeneratorService {

  generateConcatRecordsCommand(recordTitle) {

    const songComponentsPath = './audio/records/GoBarbra';
    const mp3Extension = '.mp3';
    let cmd = 'ffmpeg -y'


    const filter = ' -filter_complex "[0:a] [1:a] concat=n=16:v=0:a=1 [a]" -map [a] -c:a mp3 ';
    for (let i = 1; i < 9; i++) {
      cmd = `${cmd} -i ${songComponentsPath}${i}${mp3Extension} -i ./audio/${recordTitle.replace(/\s/g, '')}_refrain${mp3Extension}`;
    }

    return `${cmd}${filter}./audio/${recordTitle.replace(/\s/g, '')}${mp3Extension}`;
  }

  generteUrlWithVoiceFromText(text, language) {
    return googleTTS(text, language, 1)
  }

  downloadVoiceRecord(url, options, recordTitle) {
    return new Promise((resolve, reject) => {
      downloadFile(url, options, (err) => {
        if (err) throw err;
        exec(this.generateConcatRecordsCommand(recordTitle.replace(/\s/g, '')), (err) => {
          if (!err) {
            resolve();
          } else {
            reject(err);
          }
        });
      })
    })
  }

}

const songGeneratorService = new SongGeneratorService();
export default songGeneratorService;
