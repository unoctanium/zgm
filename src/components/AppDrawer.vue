<template>
  <v-navigation-drawer 
    _class="app--drawer" 
    __class="blue-grey darken-4"
    clipped
    fixed
    v-model="localShowDrawer"
    app
    :width="drawWidth"
  >
    
    <v-toolbar
      flat
      class="transparent"
      dense
    >
      <v-list
        class="pa-0"
      >
        <v-list-tile>
          <v-list-tile-action>
            <v-icon
              large
              color="orange"
            >
              {{computeLogo}}
            </v-icon>
          </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title v-text="appName" class="heading">
              </v-list-tile-title>
            </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-toolbar>
    <v-divider />

    <v-list 
      dense
    >

      <template
        v-for="(item, index) in menus" 
      >

        <v-list-group
          v-if="item.items"
          :key="item.title"
          v-model="item.active"
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
          v-else-if="item.heading"
          :key="item.heading"
        >
          {{ item.heading }}
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
export default {
  name: "AppDrawer",
  components: {
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
    computeLogo() {
      return "@/assets/logo.png"
    }
  },
  created() {},

  methods: {
    genTarget(item) {
      if (item.href) return
      if (item.component) {
        return {
          name: item.component
        }
      }
      //return { name: `${item.pathpart}/${subItem.pathpart}` }
      return { name: item.routename }
    }
  }
}
</script>

<style lang="stylus" scoped>
</style>