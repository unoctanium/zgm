<template>

<!--  <v-container v-if="!dialog" fluid ma-0 pa-0>

    <v-row no-gutter class="ma-0 pa-0">
      <v-col _cols="12" class="pa-0 ma-0">
-->
        <v-data-table
          :headers="headers"
          :items="data"
          :search="search"
          sort-by="numValue"
          class="elevation-1"
          mobile-break-point="780"
          v-if="!dialog" 
        >
         <template v-slot:top>
            <v-toolbar flat :class="{smallheaderD: $vuetify.breakpoint.smAndDown}">
              <v-toolbar-title>Test Collection</v-toolbar-title>
              <v-divider
                class="mx-4"
                inset
                vertical
              ></v-divider>
              <v-spacer></v-spacer>
              <v-text-field v-model="search" append-icon="search" label="Search" single-line hide-details></v-text-field>
              <v-btn class="mb-2" text @click="csvExport(csvData)">Export</v-btn>
              <v-btn class="mb-2" text @click="newItem()">New Item</v-btn>
              <v-btn class="mb-2" text @click="debugData()">D</v-btn>
            </v-toolbar>
          </template>

          <template v-slot:item.action="{ item }">
            <v-icon
              small
              class="mr-2"
              @click="editItem(item)"
            >
              edit
            </v-icon>
            <v-icon
              small
              @click="deleteItem(item)"
            >
              delete
            </v-icon>
          </template>

          <v-alert slot="no-results" :value="true" color="error" icon="warning">
                      Your search for "{{ search }}" found no results.
          </v-alert>
          <!-- Dynamic number of columns -->
      <!--    <template v-slot:body="props">
            <tr :key="'tr-'+idx" v-for="(item,idx) in props.items">
              <td>{{item.numValue}}</td>
              <td>{{item.textValue}}</td>
              <td>{{item.boolValue? "1": "0"}}</td>
              <td>{{item.action}}</td>
            </tr>
          </template>-->
          <template v-slot:item.boolValue="{ item }">
              <span>{{ item.boolValue? "1": "0" }}</span>
          </template>

 
        </v-data-table>
<!--
      </v-col>
    </v-row>
  </v-container>
-->
  <div v-else>

    <v-card>
      <v-card-title>
        <span class="headline">{{ formTitle }}</span>
      </v-card-title>

      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12" sm="6" md="4">
              <v-text-field v-model="editedItem.numValue" label="Num Value"></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <v-text-field v-model="editedItem.textValue" label="Text Value"></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <v-checkbox v-model="editedItem.boolValue" label="Bool Value"></v-checkbox>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
        <v-btn color="blue darken-1" text @click="save">Save</v-btn>
      </v-card-actions>
    </v-card>

  </div>

</template>

<script>

export default {
  name: "TestCollectionDetail",
  data() {
    return {
      dialog: false,
      search: '',
      headers: [
        {
          text: 'Num',
          align: 'center',
          sortable: true,
          value: 'numValue',
        },
        {
          text: 'String',
          align: 'left',
          sortable: true,
          value: 'textValue',
        },
        {
          text: 'Bool',
          align: 'left',
          sortable: false,
          value: 'boolValue',
        },
        { text: 'Actions', value: 'action', sortable: false, align: 'right' },
      ],
      //data: [],
      editedIndex: -1,
      editedItem: {
        numValue: 0,
        textValue: '',
        boolValue: false,
      },
      defaultItem: {
        numValue: 0,
        textValue: '',
        boolValue: false,
      },
    }
  },
  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
    },
    data() {
      return Object.values(this.$store.state.testCollectionModule.data)
    },

    csvData() {
      return this.data.map(item => ({
        numValue: item.numValue,
        textValue: item.textValue,
        boolValue: item.boolValue? 1 : 0
      }));
    }
  },

  watch: {
    dialog (val) {
      val || this.close()
    },
  },

  created () {
    this.initialize()
  },

  destroyed() {
     //this.$store.dispatch('testCollectionModule/closeDBChannel', {clearModule: true})
  },

  methods: {
    initialize () {
      //this.$store.dispatch('testCollectionModule/openDBChannel')
      ////.then(() => { this.data = this.$store.state.testCollectionModule.data })
    },

    newItem () {
      this.editedItem = Object.assign({}, this.defaultItem)
      this.editedIndex = -1
      this.dialog = true
    },

    editItem (item) {
      this.editedIndex = this.data.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem (item) {

      this.$dialog.confirm({
        text: 'Are you sure you want to delete this item?'
      }).
      then(res => {
        if(res) {
           this.$store.dispatch('testCollectionModule/delete', item.id)
          // TODO: @ODO: remember to delete subcollections as well
        }
      })
    },

    close () {
      this.dialog = false
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      }, 300)
    },

    save () {
      this.$store.dispatch('testCollectionModule/set', {
          ...this.editedItem
        })
      this.close()
    },

    csvExport(arrData) {
      let csvContent = "data:text/csv;charset=utf-8,";
      csvContent += [
        Object.keys(arrData[0]).join(","),
        ...arrData.map(item => Object.values(item).join(","))
      ]
        .join("\n")
        .replace(/(^\[)|(\]$)/gm, "");

      const data = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", data);
      link.setAttribute("download", "export.csv");
      link.click();
    },

    debugData() {
      console.log(this.data)
      this.$dialog.warning({
        title: 'data',
        text: "<pre>"+JSON.stringify(this.data, undefined, 2)+"</pre>"
      })
    }

  }
}
</script>

<style scoped>
header {
  position: sticky;
  top: 66px;
}
.smallheader {
  top: 58px;
}
</style>