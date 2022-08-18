import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EnvService } from '../env.service';

@Injectable({
  providedIn: 'root'
})
export class MediaService {
  auctionImages: any[] = [];
  constructor(
    private http: HttpClient,
    private envService: EnvService,
  ) { }

  downloadAuctionImages(fileId: any) {
    return new Promise((resolve, reject) => {
      if (this.auctionImages?.length) {
        const filenet = this.auctionImages.find(auction => auction.fileId === fileId);
        if (filenet) {
          return resolve(filenet)
        }
      }
      const httpOptions = {
        headers: {
          'X-CSRF-TOKEN': localStorage.getItem('x-csrf-token') as string,
        },
      };
      this.http.get<any>(this.envService.environment.apiFilenetURL + '/' + fileId, httpOptions).subscribe(response => {
        this.auctionImages.push({
          fileId: fileId,
          ...response
        })
        return resolve(response);
      });
    })
  }
}
