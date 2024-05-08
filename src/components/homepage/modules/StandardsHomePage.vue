<template>
  <section
    class="hp-standarts-wrap"
    v-if="standards"
  >
      <section
      class="hp-standarts relative"
    >
        <div class="img-cover absolute over--hide">
          <div class="img-scroll absolute">
            <g-image class="no_mobile" :src="standards.image.file.url + '?fm=webp&w=1920'"  :alt="standards.image.title"></g-image>
            <g-image class="mobile_only" :src="standards.image.file.url + '?fm=webp&w=768'"  :alt="standards.image.title"></g-image>
          </div>
        </div>
        <div class="layout">
          <div class="standarts-wrap bg--light q_flex flex--top z--1">
            <div class="standarts-title m-center m-100">
                <h2 v-if="standards.title" class="q_title title--36 amenity-up">{{ standards.title }}</h2>
                <div v-if="standards.content" class="tx--18 tx--font-light amenity-up">{{ standards.content }}</div>
            </div>
            <div class="standarts-amenity is--fit amenity-up">
              <div
                class="amenity-item q_flex flex--start"
                v-for="(amenity, index) in standards.amenity"
                :key="index"
              >
                
                <div class="amenity-ic q_flex">
                  <g-image :src="amenity.image.file.url" :alt="amenity.title" />
                </div>
                <div class="text is--fit">{{ amenity.title }}</div>
              </div>
            </div>
          </div>
        </div>
      </section>
  </section>
</template>

<script>
import gsap from 'gsap';
export default {
  name: "StandardsHomePage",
  props: {
    standards: {
      type: Object,
      require: true,
    },
  },
  mounted: function() {
    this.scrollAnimation();
  },
  methods: {
    scrollAnimation() {
      let windowWidth = window.outerWidth;
      let ySettings = -150;
      let clipPath = "circle(10% at 50% 60%)";
      if(windowWidth<800){
        ySettings = -90;
        clipPath = "circle(50% at 50% 45%)";
      }
      //if(windowWidth>800){
        gsap.fromTo(".hp-standarts", {
          "clip-path": clipPath,
          }, {
            scrollTrigger: {
                trigger: ".hp-standarts",
                start: "20px 60%",
                scrub: true,
                toggleActions: "restart pause reverse pause"
            },
            "clip-path": "circle(100% at 50% 50%)",
            duration: .6,
        });
      //}
      
      const imgScroll = gsap.utils.toArray('.img-scroll');
      imgScroll.forEach(imgScrollIt => {
        gsap.fromTo(imgScrollIt, { 
          y: ySettings,
        }, {
          scrollTrigger: {
              trigger: imgScrollIt,
               start: "20px 90%",
              end: "center -150%",
              scrub: 1,
              toggleActions: "restart pause reverse pause"
          },
          y: 0,
          duration: .6,
          //ease: "expo"
        })
      });

      const boxes = gsap.utils.toArray('.amenity-up');
      boxes.forEach((box, i) => {
        gsap.fromTo(box, { 
          y: 60,
          opacity: 0,
        }, {
          scrollTrigger: {
              trigger: box,
              start: "20px 100%",
              toggleActions: "play none none none"
          },
          opacity: 1,
          y: 0,
          duration: 1,
          delay: i * 0.06,
          //stagger: 0.2,
        })
      });
      
    },
    // beforeAnime(el){
    //   el.style.transform = "translateY(60)",
    //   el.style.opacity = "0"
    // },
    // animEnter(el){
    //    gsap.fromTo(el, {
    //       y: 60,
    //       opacity: 0,
    //   }, {
    //       scrollTrigger: {
    //           trigger: el,
    //           start: "20px 90%",
    //           toggleActions: "play none none none"
    //       },
    //       opacity: 1,
    //       y: 0,
    //       duration: .6,
    //       stagger: 0.18,
    //   });
    // },
    toHtml(doc) {
      return this.$store.getters.toHtml(doc);
    },
  },
};
</script>
