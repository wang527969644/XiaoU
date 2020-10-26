  <template>
  <el-table :data="list" style="width: 100%">
    <el-table-column prop="uid" label="用户ID" min-width="180">
    </el-table-column>
    <el-table-column prop="nickname" label="昵称" min-width="40">
    </el-table-column>
    <el-table-column prop="phone" label="手机号"> </el-table-column>
    <el-table-column prop="addtime" label="注册日期">
      <template v-slot="scope">
       {{ scope.row.addtime | moment}}
      </template>
    </el-table-column>
    <el-table-column prop="address" label="操作">
      <template v-slot='scope'>
        <el-button
          type="primary"
          icon="el-icon-edit"
          circle
          size="mini"
          @click="edit(scope.row.id)"
        ></el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import moment from 'moment'
import { getMemberList } from "../../request/member";
export default {
  data() {
    return {
      list: [],
    };
  },
  created() {
    this.getMemberList();
  },
  filters:{
    moment(e){
        return moment.unix(e/1000).format('YYYY-MM-DD h:mm:ss')
    }
  },
  methods: {
    async getMemberList() {
      const res = await getMemberList();
      if (res) {
        this.list = res;
      }
    },
    edit(id) {
      this.$router.push(`/member/${id}`);
    },
  },
};
</script>
<style scoped>
.cell {
  white-space: nowrap;
}
</style>