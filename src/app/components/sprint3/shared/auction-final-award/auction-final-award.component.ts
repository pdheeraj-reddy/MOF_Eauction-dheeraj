import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NgbModalOptions, NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { AucModeratorService } from '../../services/auc-moderator.service';

@Component({
  selector: 'app-auction-final-award',
  templateUrl: './auction-final-award.component.html',
  styleUrls: ['./auction-final-award.component.scss']
})
export class AuctionFinalAwardComponent implements OnInit {
  @Input() finalaward: any;
  closeResult: string;
  modalOptions:NgbModalOptions;


  @ViewChild("showSuccessfulModal") modalContentApp: TemplateRef<any>;

  @ViewChild("showSuccessfulRejModal") modalContentRej: TemplateRef<any>;
  constructor(private api : AucModeratorService,private modalService: NgbModal) { }

  ngOnInit(): void {
  }
  approve(){
    
    this.api.postAppporRej(this.finalaward,'G').subscribe((res=>{
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
    this.api.postAppporRej(this.finalaward,'J').subscribe((res=>{
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
