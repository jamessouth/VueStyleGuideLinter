<script>
import { fake, mixins } from 'super_fake';

const { ersatz } = mixins;

export default {
  name: 'fake',
  extends: falsehood,
  mixins: [ersatz],
  props: {
    options: Object,
  },
  mounted() {
    this.fakeEverything(this.fakeData, this.options);
  },
};
</script>

<style></style>
