<template>
  <v-data-table
    :headers="headers"
    :items="data"
    sort-by="numValue"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>Test Collection</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
        <v-btn class="mb-2" @click="csvExport(csvData)">Export</v-btn>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on }">
            <v-btn class="mb-2" v-on="on">New Item</v-btn>
          </template>
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
        </v-dialog>
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
    <!--
    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize()">Init</v-btn>
    </template>
    -->
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
</template>

<script>

export default {
  name: "TestCollectionReport",
  data() {
    return {
      dialog: false,
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
        { text: 'Actions', value: 'action', sortable: false },
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
     this.$store.dispatch('testCollectionModule/closeDBChannel', {clearModule: true})
  },

  methods: {
    initialize () {
      this.$store.dispatch('testCollectionModule/openDBChannel')
      //.then(() => { this.data = this.$store.state.testCollectionModule.data })
    },

    editItem (item) {
      this.editedIndex = this.data.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem (item) {
      //const index = this.data.indexOf(item)

      this.$dialog.confirm({
        text: 'Are you sure you want to delete this item?'
      }).
      then(res => {
        if(res) {
           this.$store.dispatch('testCollectionModule/delete', item.id)
          //this.data.splice(index, 1)
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
      //if (this.editedIndex > -1) {
        //Object.assign(this.data[this.editedIndex], this.editedItem)
        this.$store.dispatch('testCollectionModule/set', {
            ...this.editedItem
          })
        //##
      //} else {
        //this.data.push(this.editedItem)
      //}
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

  }
}
</script>