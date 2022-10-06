import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import firebase from "firebase";
import {
  FormBuilder,
  FormGroup,
} from "@angular/forms";
import {MatDrawer} from "@angular/material/sidenav";
import { Web3Service } from '../../../../core/web3/web3.service';
import { MintService } from '../mint/mint.service';
import StakeABI from "./stakeABI.json";
import { AbiItem } from 'web3-utils';
import { NftService } from '../../../../core/nft/nft.service';

interface Token {
  name: string;
  value: string;
}
@Component({
  selector: 'app-stake',
  templateUrl: './stake.component.html',
  styleUrls: ['./stake.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class StakeComponent implements OnInit {
  @ViewChild('drawer') drawer: MatDrawer;

  private readonly stakeAddress: string;

  stakeContract: any;
  verticalStepperForm: FormGroup;
  isConnected: boolean;
  tokens: Token[];
  stakedIds: string[];
  web3obj: {
    account: any;
    balance: any;
    block: any;
    blockNumber: any;
    code: any;
    gas_price: any;
  } = {
    account: null,
    balance: null,
    block: null,
    blockNumber: null,
    code: null,
    gas_price: null,
  }

  constructor(
    private readonly _formBuilder: FormBuilder,
    private readonly _web3: Web3Service,
    private readonly _nft: NftService,
  ) {
    this.stakeAddress = this._nft.stakeAddress;

    this.isConnected = false;
    this.stakedIds = [];
    this.tokens = [
      {
        name: "FuseBlock",
        value: this._nft.fuseBlockAddress,
      },
      {
        name: "ItemNFT",
        value: this._nft.itemAddress,
      }
    ]
  }

  ngOnInit(): void {
    // Vertical stepper form
    this.verticalStepperForm = this._formBuilder.group({
      tokenAddress: [
        ''
      ],
      tokenId: [
        ''
      ],
      amount: [
        ''
      ],
    });
  }

  connectWallet() {
    this._web3.getAccounts().then(async response => {
        if (response) {
            this.web3obj.account = response;
            const web3 = await this._web3.getWeb3();
            this.stakeContract = new web3.eth.Contract(StakeABI as AbiItem[], this.stakeAddress);
            this.isConnected = true;
        }
    });
  }

  async stake() {
    if (!this.stakeContract) {
      this.connectWallet();
    } else {
      const tokenId = parseInt(this.verticalStepperForm.get('tokenId').value);
      const tokenAddress = this.verticalStepperForm.get('tokenAddress').value;
      const amount = parseInt(this.verticalStepperForm.get('amount').value);
      await this.stakeContract.methods.stake(tokenAddress, tokenId, amount).send({from: this.web3obj.account[0]});
    }
  }

  async unstake() {
    if (!this.stakeContract) {
      this.connectWallet();
    } else {
      const tokenId = parseInt(this.verticalStepperForm.get('tokenId').value);
      const tokenAddress = this.verticalStepperForm.get('tokenAddress').value;
      const amount = parseInt(this.verticalStepperForm.get('amount').value);
      await this.stakeContract.methods.unstake(tokenAddress, tokenId, amount).send({from: this.web3obj.account[0]});
    }
  }

  async getStakedIds() {
    if (!this.stakeContract) {
      this.connectWallet();
    } else {
      const tokenAddress = this.verticalStepperForm.get('tokenAddress').value;
      this.stakedIds = await this.stakeContract.methods.getStakedIds(tokenAddress).call({from: this.web3obj.account[0]});
    }
  }
}

