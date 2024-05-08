<template>
  <div>
    <h2 class="q_title title--36 mb--22">Share this apartments</h2>
    <div class="hold-so-mail q_flex flex--top mb--22">
      <a @click.stop="copyURL" class="bt--share q_flex flex--start m-100">
        <g-image src="~/assets/image/sr-copy.svg" alt="sr-copy"></g-image>
        Copy link
      </a>
      <a
        class="bt--share q_flex flex--start m-100"
        :href="
          'http://api.addthis.com/oexchange/0.8/forward/gmail/offer?url=' +
            absoluteURL
        "
        rel="nofollow"
        target="_blank"
        @click="onShare('email')"
      >
        <g-image src="~/assets/image/email.svg" alt="email"></g-image>
        Send via email
      </a>
    </div>
    <div class="title--14">Share in socials</div>
    <div class="hold-so-social q_flex flex--top mb--22">
      <a
        class="bt--share q_flex flex--start m-flex--center"
        :href="
          'http://api.addthis.com/oexchange/0.8/forward/messenger/offer?url=' +
            absoluteURL
        "
        rel="nofollow"
        target="_blank"
        @click="onShare('messenger')"
      >
        <g-image src="~/assets/image/sr-messenger.svg" alt="sr-messenger"></g-image>
        <span class="no_mobile">Messenger</span>
      </a>
      <a
        class="bt--share q_flex flex--start m-flex--center"
        :href="
          'http://api.addthis.com/oexchange/0.8/forward/whatsapp/offer?url=' +
            absoluteURL
        "
        rel="nofollow"
        target="_blank"
        @click="onShare('whatsapp')"
      >
        <g-image src="~/assets/image/sr-whatsapp.svg" alt="whatsapp"></g-image>
        <span class="no_mobile">WhatsApp</span>
      </a>
      <a
        class="bt--share q_flex flex--start m-flex--center"
        :href="
          'http://api.addthis.com/oexchange/0.8/forward/facebook/offer?url=' +
            absoluteURL
        "
        rel="nofollow"
        target="_blank"
        @click="onShare('facebook')"
      >
        <g-image src="~/assets/image/sr-facebook.svg" alt="facebook"></g-image>
        <span class="no_mobile">Facebook</span>
      </a>
      <a
        class="bt--share q_flex flex--start m-flex--center"
        :href="
          'http://api.addthis.com/oexchange/0.8/forward/linkedin/offer?url=' +
            absoluteURL
        "
        rel="nofollow"
        target="_blank"
        @click="onShare('linkedin')"
      >
        <g-image src="~/assets/image/sr-linkedin.svg" alt="linkedin"></g-image>
        <span class="no_mobile">Linkedin</span>
      </a>
      <a
        class="bt--share q_flex flex--start m-flex--center"
        :href="
          'http://api.addthis.com/oexchange/0.8/forward/twitter/offer?url=' +
            absoluteURL
        "
        rel="nofollow"
        target="_blank"
        @click="onShare('twitter')"
      >
        <g-image src="~/assets/image/sr-twitter.svg" alt="twitter"></g-image>
        <span class="no_mobile">Twitter</span>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "SharePopUp",
  computed: {
    absoluteURL() {
      if(process.client) {
        return location.origin + this.$route.path;
      }
      return "https://staykula.com" + this.$route.path;
    },
  },
  methods: {
    copyURL() {
      navigator.clipboard.writeText(this.absoluteURL);
      this.$store.dispatch("tagManagerEvent", {
        type: "ShareClicked",
        value: {
          provider: "copy url",
        },
      });
    },
    onShare(type) {
      this.$store.dispatch("tagManagerEvent", {
        type: "ShareClicked",
        value: {
          provider: type,
        },
      });
    },
  },
};
</script>
