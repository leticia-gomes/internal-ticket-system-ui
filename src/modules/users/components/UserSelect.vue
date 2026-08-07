<script setup lang="ts">
import { onMounted } from 'vue'
import { useUserStore } from '../stores/user.store'

const userStore = useUserStore()

onMounted(() => {
  userStore.fetchUsers()
})
</script>
