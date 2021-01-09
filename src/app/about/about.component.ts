import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import {
  faCircle,
  faCaretUp,
  faPlay,
  faDownload
} from '@fortawesome/free-solid-svg-icons';
import {
  faStepForward
} from '@fortawesome/free-solid-svg-icons';
import { start } from 'repl';

declare const $: any;

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.less']
})
export class AboutComponent implements OnInit, OnChanges {
  faCircle = faCircle;
  faCaretUp = faCaretUp;
  faPlay = faPlay;
  faDownload = faDownload;
  faStepForward = faStepForward;
  showAnimation = true;
  slideDelay: number;
  listOfItems = [];

  constructor() { }

  ngOnInit() {
    // this.showAnimation = false;
    // this.aboutAnimation();
    this.endAboutAnimations();
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
    $('.scrollbar').resize(() => {
      console.log($('.scrollbar').height());
    });
  }

  aboutAnimation() {
    this.showAnimation = true;
    if (this.showAnimation) {
      this.showInfoText();
      this.showInfoAnimation();
    } else {
      this.endAboutAnimations();
    }
  }

  showInfoText() {
    const listInfo = $(`#about-text`).find('li');
    const listSkills = $(`#about-skills`).find('li');
    const listLanguages = $(`#about-languages`).find('li');

    if ($(window).width() <= 425) {
      this.listOfItems.push($(`#about-title`)[0]);
      listInfo.map((index, info) => this.listOfItems.push(info));
      this.listOfItems.push($('#about-photo')[0]);
      this.listOfItems.push($(`#about-subtitle`)[0], $(`#about-skills-title`)[0]);
      listSkills.map((index, skill) => this.listOfItems.push(skill));
      this.listOfItems.push($(`#about-languages-title`)[0]);
      listLanguages.map((index, language) => this.listOfItems.push(language));
    } else {
      this.listOfItems.push($('#about-photo')[0], $(`#about-title`)[0]);
      listInfo.map((index, info) => this.listOfItems.push(info));
      this.listOfItems.push($(`#about-subtitle`)[0], $(`#about-skills-title`)[0]);
      listSkills.map((index, skill) => this.listOfItems.push(skill));
      this.listOfItems.push($(`#about-languages-title`)[0]);
      listLanguages.map((index, language) => this.listOfItems.push(language));
    }
  }

  showInfoAnimation() {
    this.slideDelay = 0;
    let itemHeight = 0;
    this.listOfItems.map((item, index) => {
      if (item.tagName === 'DIV') {
        $(item).delay(this.slideDelay).css('display', 'block').animate({
          opacity: '1',
          maxHeight: '350px',
          minHeight: '300px',
          maxWidth: '263px',
          minWidth: '213px'
        }, 1000, () => {
          $('.scrollbar').animate({
            scrollTop: itemHeight += $(item).height()
          }, 900);
        });
        this.slideDelay += 1000;
      } else if (item.tagName === 'LI') {
        $(item).delay(this.slideDelay).slideDown(1000, () => {
          console.log(index);
          if (index === this.listOfItems.length - 1) {
            this.showAnimation = false;
          }
          $('.scrollbar').animate({
            scrollTop: itemHeight += $(item).height()
          }, 900);
        });
        this.slideDelay += 1000;
      } else {
        if (item.tagName === 'H1') {
          $(item).delay(this.slideDelay).animate({
            'font-size': '32px'
          }, 1000, () => {
            $('.scrollbar').animate({
              scrollTop: itemHeight += $(item).height()
            }, 900);
          });
        } else {
          $(item).delay(this.slideDelay).animate({
            'font-size': '18px'
          }, 1000, () => {
            $('.scrollbar').animate({
              scrollTop: itemHeight += $(item).height()
            }, 900);
          });
        }
        this.slideDelay += 1000;
      }

      // if ($(window).width() <= 425 && this.showAnimation) {
      //   // setTimeout(() => {
      //   //   $('.scrollbar').animate({
      //   //     scrollTop: itemHeight
      //   //   }, 1100)
      //   // }, 7500);
      // } else {
      //   $('.scrollbar').animate({
      //     scrollTop: itemHeight
      //   }, 900)
      // }
    });
  }

  endAboutAnimations() {
    this.showAnimation = false;
    this.slideDelay = 0;
    this.listOfItems = [];
    $('#about-photo').css('display', 'block').animate({
      opacity: '1',
      maxHeight: '350px',
      minHeight: '300px',
      maxWidth: '263px',
      minWidth: '213px'
    }, 0);

    $(`#about-title`).css('font-size', '32px');
    $(`#about-text`).find('li').css('display', 'list-item');
    $(`#about-skills`).find('li').css('display', 'list-item');
    $(`#about-languages`).find('li').css('display', 'list-item');
    $(`#about-subtitle, #about-skills-title, #about-languages-title`).css('font-size', '18px');
    // $('.scrollbar').animate({
    //   scrollTop: 0
    // }, 0)
  }
}
