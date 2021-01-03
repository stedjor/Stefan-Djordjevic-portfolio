import { Component, OnInit } from '@angular/core';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faStepForward } from '@fortawesome/free-solid-svg-icons';

declare const $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less'],
})
export class HomeComponent implements OnInit {
  faGithub = faGithub;
  faStepForward = faStepForward;
  text1: string;
  text2: string;
  text3: string;
  text4: string;
  textWriting1: string;
  textWriting2: string;
  textWriting3: string;
  textWriting4: string;
  wholeText: string;
  textArray: string[];
  twAnimation: boolean;
  constructor() {}

  ngOnInit() {
    this.definingVariablesForAnimation();
    this.inAnimation();
    this.homeAnimation();
    this.checkHeightOfcontainer();
  }

  checkHeightOfcontainer() {
    const hcHeight = $('.home-container').css('height');

    setTimeout(() => {
      window.scrollTo(0, document.body.scrollHeight);
    }, 600000);
    console.log(document.body.scrollHeight, hcHeight);
    if (parseInt(hcHeight) > 440) {
      console.log('jeste', parseInt(hcHeight));
    }
  }

  homeAnimation() {
    let i = 0;
    this.wholeText = `${this.text1} ${this.text2} ${this.text3} ${this.text4}`;
    this.textArray.push(this.text1, this.text2, this.text3, this.text4);
    this.titleAnimation();
    this.twAnimation = true;
    if (this.twAnimation) {
      setTimeout(() => {
        this.startTypeWriter(i);
      }, 1700);
    }
  }

  titleAnimation() {
    if ($(window).width() <= 768 && $(window).width() > 425) {
      $('#home-title')
        .animate(
          {
            'font-size': '32px',
          },
          1000
        )
        .animate(
          {
            'font-size': '22px',
          },
          100
        )
        .animate(
          {
            marginTop: 0,
          },
          500
        );
    } else if ($(window).width() <= 425 && $(window).width() > 375) {
      $('#home-title')
        .animate(
          {
            'font-size': '20px',
          },
          1000
        )
        .animate(
          {
            'font-size': '18px',
          },
          100
        )
        .animate(
          {
            marginTop: 0,
          },
          500
        );
    } else if ($(window).width() <= 375 && $(window).width() > 320) {
      $('#home-title')
        .animate(
          {
            'font-size': '17px',
          },
          1000
        )
        .animate(
          {
            'font-size': '15x',
          },
          100
        )
        .animate(
          {
            marginTop: 0,
          },
          500
        );
    } else if ($(window).width() <= 320) {
      $('#home-title')
        .animate(
          {
            'font-size': '16px',
          },
          1000
        )
        .animate(
          {
            'font-size': '14x',
          },
          100
        )
        .animate(
          {
            marginTop: 0,
          },
          500
        );
    } else {
      $('#home-title')
        .animate(
          {
            'font-size': '42px',
          },
          1000
        )
        .animate(
          {
            'font-size': '32px',
          },
          100
        )
        .animate(
          {
            marginTop: 0,
          },
          500
        );
    }
  }

  startTypeWriter(i) {
    if (i < this.wholeText.length && this.twAnimation) {
      if (i < this.textArray[0].length) {
        this.textWriting1 += this.wholeText.charAt(i);
      } else if (
        i > this.textArray[0].length &&
        i <= this.textArray[0].length + this.textArray[1].length
      ) {
        this.textWriting2 += this.wholeText.charAt(i);
      } else if (
        i > this.textArray[1].length &&
        i <=
          this.textArray[0].length +
            this.textArray[1].length +
            this.textArray[2].length
      ) {
        this.textWriting3 += this.wholeText.charAt(i);
      } else if (i > this.textArray[2].length) {
        this.textWriting4 += this.wholeText.charAt(i);
      }
      i++;
      setTimeout(() => {
        this.startTypeWriter(i);
      }, 50);
      if (i === this.wholeText.length - 1) {
        this.twAnimation = false;
        this.outAnimation();
      }
    }
  }

  endTypeWriter() {
    this.twAnimation = false;
    this.outAnimation();
  }

  definingVariablesForAnimation() {
    this.text1 = $('#txt1').text();
    this.text2 = $('#txt2').text();
    this.text3 = $('#txt3').text();
    this.text4 = $('#txt4').text();
    this.textWriting1 = '';
    this.textWriting2 = '';
    this.textWriting3 = '';
    this.textWriting4 = '';
    this.textArray = [];
    this.twAnimation = true;
  }

  inAnimation() {
    $('#txt1').css('display', 'none');
    $('#txt2').css('display', 'none');
    $('#txt3').css('display', 'none');
    $('#txt4').css('display', 'none');
    $('#textWriter1').css('display', 'block');
    $('#textWriter2').css('display', 'block');
    $('#textWriter3').css('display', 'block');
    $('#textWriter4').css('display', 'block');
  }

  outAnimation() {
    $('#txt1').css('display', 'block');
    $('#txt2').css('display', 'block');
    $('#txt3').css('display', 'block');
    $('#txt4').css('display', 'block');
    $('#textWriter1').css('display', 'none');
    $('#textWriter2').css('display', 'none');
    $('#textWriter3').css('display', 'none');
    $('#textWriter4').css('display', 'none');
  }
}
