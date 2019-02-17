<script>
import { fake, mixins } from 'super_fake';

const { ersatz } = mixins;

export default {
  mixins: [ersatz],
  props: {
    options: Object,
  },
  name: 'fake',
  mounted() {
    this.fakeEverything(this.fakeData, this.options);
  },
  extends: falsehood,
};
</script>

<style></style>
