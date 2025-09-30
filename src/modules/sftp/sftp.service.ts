import { ConflictException, Injectable } from '@nestjs/common';
import * as Client from 'ssh2-sftp-client';
import * as fs from 'fs';
import { ConfigService } from '@nestjs/config';
import { SmtpLocation, SmtpFile } from 'src/types/sftp';
@Injectable()
export class SftpService {

    private sftp = new Client()
    private rsa: string

    constructor(private readonly config: ConfigService) {
        this.rsa = this.config.get<string>("RSA_PATH") ?? ""
    }

    async uploadData(localFile: SmtpFile, remoteFilePath: SmtpLocation) {
        try {
            await this.sftp.connect({
                host: this.config.get<string>("SFTP_HOST"),
                port: this.config.get<number>("SFTP_PORT"),
                username: this.config.get<string>("SFTP_USERNAME"),
                privateKey: fs.readFileSync(this.rsa)
            })
            const send = await this.sftp.put(localFile, remoteFilePath);
            return send
        } catch (e) {
            console.log(e)
            throw new ConflictException(e)
        } finally {
            this.sftp.end()
        }
    }
}
