const googleTTS = require('google-tts-api');
const downloadFile = require('download-file');
const { exec } = require('child_process');
const audioconcat = require('audioconcat')
const fs = require('fs');

class SongGeneratorService {

  generateConcatRecordsCommand(recordTitle) {
    
    const songComponentsPath = './audio/records/GoBarbra';
    const mp3Extension = '.mp3';
    let cmd = 'ffmpeg'


    const filter = ' -filter_complex "[0:a] [1:a] concat=n=16:v=0:a=1 [a]" -map [a] -c:a mp3 ';
    for (let i = 1; i < 9; i++) {
      cmd = `${cmd} -i ${songComponentsPath}${i}${mp3Extension} -i fromTs${mp3Extension}`;
    }

    return `${cmd}${filter}./audio/${recordTitle}${mp3Extension}`;
  }

  generteUrlWithVoiceFromText(text, language, speed = 1) {
    return googleTTS(text, language, 1)
  }

  downloadVoiceRecord(url, options, recordTitle) {
    return new Promise((resolve, reject) => {
      downloadFile(url, options, (err) => {
        if (err) throw err;
        exec(this.generateConcatRecordsCommand(recordTitle), (err) => {
          if (!err) {
            resolve();
          } else {
            reject(error);
          }
        });
      })
    })
  }

  async readRecordsFileNames() {
    return new Promise((resolve, reject) => {
      fs.readdir('./audio/records', (err, files) => {
        if (err) reject(err);
        files.forEach((file, index) => {
          const fileWithPath = `./audio/records/${file}`;
          files[index] = fileWithPath
        })
        resolve(files)
      });
    })

  }

  concatRecords(records) {
    audioconcat(records).concat('all.mp3')
  }

}

const songGeneratorService = new SongGeneratorService();
export default songGeneratorService;
