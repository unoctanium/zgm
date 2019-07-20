<template>
  <v-navigation-drawer 
    __class="app--drawer" 
    _class="blue-grey darken-4"
    clipped
    fixed
    v-model="localShowDrawer"
    app
    :width="drawWidth"
    mobile-break-point="960"
    style="overflow: auto"
  >

    <!--<v-toolbar color="primary darken-1" dark>
      <img src="@/assets/logo.png" height="36" alt="logo" />
      <v-toolbar-title class="ml-0 pl-3" v-text="appName">
      </v-toolbar-title>
    </v-toolbar>
    -->

    <!--<v-divider />-->

      <v-list 
        dense
        class="app--list" 
      >

        <template
          v-for="(item, index) in menus" 
        >

          <v-list-group
            v-if="item.items"
            :key="item.title"
            _v-model="item.active"
            :prepend-icon="item.icon"
            no-action
          >
            <template v-slot:activator>
              <v-list-tile>
                <v-list-tile-content>
                  <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
            </template>

            <v-list-tile
              v-for="subItem in item.items"
              :key="subItem.title"
              :to="genTarget(subItem)"
              :href="subItem.href"
              :disabled="subItem.disabled"
              :target="subItem.target"
            >
              <v-list-tile-content>
                <v-list-tile-title>{{ subItem.title }}</v-list-tile-title>
              </v-list-tile-content>

              <v-list-tile-action v-if="subItem.icon">
                <v-icon>{{ subItem.icon }}</v-icon>
              </v-list-tile-action>
            </v-list-tile>
          
          </v-list-group>

          <v-subheader
            v-else-if="item.header"
            :key="item.header"
          >
            {{ item.header }}
          </v-subheader>
            
          <v-divider
            v-else-if="item.divider"
            :key="index"
          >
          </v-divider>
            
          <v-list-tile
            v-else-if="item.icon"
            :key="item.title"
            :href="item.href"
            :to="genTarget(item)"
            :disabled="item.disabled"
            :target="item.target"
          >
            <v-list-tile-action v-if="item.icon">
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>

            <v-list-tile-content>
              <v-list-tile-title>{{ item.title }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>

        </template>
      </v-list>
     
  </v-navigation-drawer>
</template>
<script>

import menu from "@/api/menu"
// import VuePerfectScrollbar from "vue-perfect-scrollbar"
export default {
  name: "AppDrawer",
  components: {
    // VuePerfectScrollbar
  },
  props: {
    drawWidth: {
      type: [Number, String],
      default: "260"
    },
    showDrawer: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      appName: process.env.VUE_APP_APP_NAME,
      menus: menu,
      scrollSettings: {
        maxScrollbarLength: 160
      },
      localShowDrawer: this.showDrawer
    }
  },
  watch: {
     showDrawer: function() {
       this.localShowDrawer = this.showDrawer
     },
     localShowDrawer: function() {
       this.$emit('update:showDrawer', this.localShowDrawer)
     }
  },
  computed: {
  },
  created() {    
  },
  methods: {
    genTarget(item) {
      if (item.href) return
      if (item.named_route) {
        return {
          name: item.named_route
        }
      }
      //return { name: `${item.pathpart}/${subItem.pathpart}` }
      return ( item.path_route )
    }
  }
}
</script>

<style lang="stylus" scoped>
/*.app--drawer
  overflow: auto
  */
</style>