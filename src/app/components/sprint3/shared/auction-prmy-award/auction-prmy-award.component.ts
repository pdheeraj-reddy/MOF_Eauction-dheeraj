import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ModalDismissReasons, NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { AucModeratorService } from '../../services/auc-moderator.service';

@Component({
  selector: 'app-auction-prmy-award',
  templateUrl: './auction-prmy-award.component.html',
  styleUrls: ['./auction-prmy-award.component.scss']
})
export class AuctionPrmyAwardComponent implements OnInit {
  closeResult: string;
  modalOptions:NgbModalOptions;
  @Input() prmyaward: any;

  @ViewChild("showSuccessfulModal") modalContentApp: TemplateRef<any>;

  @ViewChild("showSuccessfulRejModal") modalContentRej: TemplateRef<any>;
  
  constructor(private api : AucModeratorService,private modalService: NgbModal) { }

  ngOnInit(): void {
  }
  approve(){
    this.api.postAppporRej(this.prmyaward,'M').subscribe((res=>{
      console.log(res)
      if(res['d']['Msgty'] === 'S'){
        this.modalService.open(this.modalContentApp).result.then((result) => {
          this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
      }
    }))
  }

  reject(){
    this.api.postAppporRej(this.prmyaward,'D').subscribe((res=>{
      console.log(res)
      if(res['d']['Msgty'] === 'S'){
      this.modalService.open(this.modalContentRej).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
    }
   
    }))
  }


  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
}
