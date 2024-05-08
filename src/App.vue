<template>
  <transition
    name="slide-fade"
    appear
    @before-enter="onBeforeEnter"
    @enter="onEnter"
    @after-enter="onAfterEnter"
    @enter-cancelled="onEnterCancelled"
    @before-leave="onBeforeLeave"
    @leave="onLeave"
    @after-leave="onAfterLeave"
  >
    <router-view />
  </transition>
</template>

<script>
// import gsap from "gsap";
// import ScrollTrigger from "gsap/ScrollTrigger";
export default {
  data() {
    return {
      mailchimpScript: `!function(c,h,i,m,p){m=c.createElement(h),p=c.getElementsByTagName(h)[0],m.async=1,m.src=i,p.parentNode.insertBefore(m,p)}(document,"script","https://chimpstatic.com/mcjs-connected/js/users/06761f73c2bcca422319db510/fcacf09d9335ee95a10f99f28.js");`
    };
  },
  methods: {
    onBeforeEnter(el) {},
    onEnter(el, done) {},
    onAfterEnter(el) {},
    onEnterCancelled(el) {},
    onBeforeLeave(el) {},
    onLeave(el, done) {
      done();
    },
    onAfterLeave(el) {},
    leaveCancelled(el) {},

    addMailchimpScript() {
      // The script is added by setting the innerHTML of the div
      document.getElementById('mcjsScript').innerHTML = this.mailchimpScript;
    },

  },
  mounted() {

    this.addMailchimpScript();


    // window.googleTranslateElementInit = function() {
      // let translateElements = document.getElementsByClassName(
      //   "google_translate_element"
      // );
      //let counter = 0
      /*for(var i in translateElements){
        translateElements[i].setAttribute("id","google_translate_element_"+counter);
        counter++;
      }*/
      /*document.querySelectorAll('.google_translate_element').forEach(function(el,index) {
        el.id = "google_translate_element_"+index;
        //el.removeAttribute('class');
        new google.translate.TranslateElement(
          {
            pageLanguage: "en",
            includedLanguages: "es,fr,en",
            layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
          },
          "google_translate_element_"+index
        );
        });*/
      // new google.translate.TranslateElement(
      //   {
      //     pageLanguage: "en",
      //     includedLanguages: "es,fr,en",
      //     layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
      //   },
      //   "google_translate_element"
      // );

      // let pageDelayed = 3000;
      // let first = document.querySelector("#google_translate_element");
      // let second = document.querySelector("#google_translate_element2");

      // let nowChanging = false;

      // setTimeout(function() {
      //   let select = first.querySelector("select");
      //   const clone = first.cloneNode(true);
      //   clone.id = "google_translate_element22";
      //   second.appendChild(clone);
      //   second.querySelector("select").value = select.value;
      //   let selectSecond = second.querySelector("select");

      //   select.addEventListener("change", function(event) {
      //     if (nowChanging == false) {
      //       second.querySelector("select").value = this.value;
      //     }
      //     return true;
      //   });

      //   selectSecond.addEventListener("change", function(event) {
      //     if (nowChanging) {
      //       return;
      //     }

      //     nowChanging = true;
      //     first.querySelector("select").value = this.value;
      //     setTimeout(function() {
      //       nowChanging = false;
      //     }, 1000);
      //   });
      // }, pageDelayed);
    // };

    // let recaptchaScript = document.createElement("script");
    // recaptchaScript.setAttribute(
    //   "src",
    //   "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
    // );
    // document.body.appendChild(recaptchaScript);
    // var s = document.createElement("script");
    // var h = document.querySelector("head") || document.body;
    // s.src = "https://acsbapp.com/apps/app/dist/js/app.js";
    // s.async = true;
    // s.onload = function() {
    //   acsbJS.init({
    //     statementLink: "",
    //     footerHtml: "",
    //     hideMobile: false,
    //     hideTrigger: false,
    //     disableBgProcess: false,
    //     language: "en",
    //     position: "right",
    //     leadColor: "#146FF8",
    //     triggerColor: "#146FF8",
    //     triggerRadius: "50%",
    //     triggerPositionX: "right",
    //     triggerPositionY: "bottom",
    //     triggerIcon: "people",
    //     triggerSize: "bottom",
    //     triggerOffsetX: 20,
    //     triggerOffsetY: 20,
    //     mobile: {
    //       triggerSize: "small",
    //       triggerPositionX: "right",
    //       triggerPositionY: "bottom",
    //       triggerOffsetX: 20,
    //       triggerOffsetY: 20,
    //       triggerRadius: "20",
    //     },
    //   });
    // };
    // document.body.appendChild(s);
  },
  created() {
    setTimeout(async () => {
      let osano = document.createElement("script");
      osano.setAttribute("src", "https://cmp.osano.com/Azz82PT7DDeYx9RZ/e03cb128-d9c0-484e-a59b-b788bc35166a/osano.js");
      await document.head.appendChild(osano);
      let mews = document.createElement("script");
      mews.setAttribute("src", "https://api.mews.com/distributor/distributor.min.js");
      await document.head.appendChild(mews);
      let elfsight = document.createElement("script");
      elfsight.setAttribute("src", "https://apps.elfsight.com/p/platform.js");
      await document.body.appendChild(elfsight);
      let mailchimp = document.createElement("script");
      mailchimp.setAttribute("id", "mcjs");
      mailchimp.textContent = `!function(c,h,i,m,p){m=c.createElement(h),p=c.getElementsByTagName(h)[0],m.async=1,m.src=i,p.parentNode.insertBefore(m,p)}(document,"script","https://chimpstatic.com/mcjs-connected/js/users/06761f73c2bcca422319db510/fcacf09d9335ee95a10f99f28.js");`;
      await document.head.appendChild(mailchimp);
      this.isLoadReview = true;
    }, 5000);
  },
};
</script>

<style>
.fadeenter-enter-active {
  transition: opacity 2.5s;
}

.fadeenter-enter {
  opacity: 0;
}
/* Enter and leave animations can use different */
/* durations and timing functions.              */
.slide-fade-enter-active {
  transition: all 1.5s ease;
}
.slide-fade-leave-active {
  transition: all 1.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateY(-10px);
  opacity: 0;
}
</style>

<static-query>
query {
  metadata {
    siteName
    siteDescription
  }
}
</static-query>