<style lang="less">
</style>

<template>
  <div>
    <Button type="primary"
            size="small"
            icon="md-cloud-upload"
            @click="uploadModal = true">
      {{ label }}
    </Button>
    <Modal v-model="uploadModal"
           draggable
           width="800"
           :zIndex="1100"
           title="附件管理">
      <Upload ref="gisFormUpload"
              :show-upload-list="false"
              :default-file-list="defaultList"
              action="//jsonplaceholder.typicode.com/posts/">
        <Button type="primary"
                icon="md-cloud-upload">
          点击上传
        </Button>
        <p style="display: inline;margin-left: 10px;color: rgba(0,0,0,.45)">支持上传".pdf,.jpg,.png,.doc,.docx,.dwg"格式文件</p>
      </Upload>
      <List style="max-height: 400px; overflow-y: auto">
        <ListItem v-for="(item, index) in uploadList"
                  :key="index">
          <template v-if="item.status === 'finished'">
            <ListItemMeta avatar="/images/gis-plugin/jpg.png"
                          :title="item.name"
                          description="留个详情介绍，不要的话再删掉" />
            <template slot="action">
              <li>
                <Icon style="font-size: 16px"
                      type="md-search" />
              </li>
              <li>
                <Icon style="font-size: 16px"
                      type="md-download" />
              </li>
              <li>
                <Icon style="font-size: 16px"
                      type="md-trash" />
              </li>
            </template>
          </template>
          <template v-else>
            <b style="width: 100px;margin-left: 10px">正在上传...</b>
            <Progress v-if="item.showProgress"
                      :percent="item.percentage"></Progress>
          </template>
        </ListItem>
      </List>
    </Modal>
  </div>
</template>

<script>
export default {
  name: 'gisFormUpload',
  props: {
    label: {
      type: String,
      default: '附件管理'
    },
    url: String,
  },
  data () {
    return {
      uploadModal: false,
      uploadList: [],
      defaultList: [
        {
          'name': 'a42bdcc1178e62b4694c830f028db5c0',
          'url': 'https://o5wwk8baw.qnssl.com/a42bdcc1178e62b4694c830f028db5c0/avatar',
          format: 'img'
        },
        {
          'name': 'bc7521e033abdd1e92222d733590f104',
          'url': 'https://o5wwk8baw.qnssl.com/bc7521e033abdd1e92222d733590f104/avatar',
          format: 'img'
        }
      ],
    }
  },
  methods: {
    // A: 组件内部事件

    // B: 组件相应外部事件
    // 根据外部组件生命周期触发回调
    /**
     * 初始化钩子
     * @param {*} mode 状态(add,edit,show,approval)
     */
    onInit (mode) {

    },
    /**
     * 上传钩子
     * @returns 该字段要上传的值
     */
    onSubmit () {
      return this.uploadList
    },
    /**
     * 禁用表单钩子
     * @param {Boolean} disabled 是否禁用
     */
    onDisabled (disabled) {
      this.disabled = disabled;
    },
    /**
     * 重置表单钩子
     */
    onResetField: function () {

    }
  },
  mounted () {
    this.uploadList = this.$refs.gisFormUpload.fileList
  }
}
</script>
