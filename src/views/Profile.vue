<template>
  <v-card>
    <v-img src="/static/people/man/m1.jpg" height="390">
      <v-layout column class="media ma-0">
        <v-card-title>
          <!--<v-btn dark icon>
            <v-icon>chevron_left</v-icon>
          </v-btn>
          -->
          <v-spacer></v-spacer>
          <v-btn dark icon class="mr-3">
            <v-icon>edit</v-icon>
          </v-btn>
          <v-btn dark icon>
            <v-icon>more_vert</v-icon>
          </v-btn>
        </v-card-title>
        <v-spacer></v-spacer>
        <v-card-title class="white--text pl-5 pt-5">
          <div class="display-1 pl-5 pt-5">Ali Conners</div>
        </v-card-title>
      </v-layout>
    </v-img>
    <v-list two-line class="pa-0">
      <v-list-tile href="#">
        <v-list-tile-action>
          <v-icon color="indigo">phone</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>(650) 555-1234</v-list-tile-title>
          <v-list-tile-sub-title>Mobile</v-list-tile-sub-title>
        </v-list-tile-content>
        <v-list-tile-action>
          <v-icon>chat</v-icon>
        </v-list-tile-action>
      </v-list-tile>
      <v-list-tile href="#">
        <v-list-tile-action></v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>(323) 555-6789</v-list-tile-title>
          <v-list-tile-sub-title>Work</v-list-tile-sub-title>
        </v-list-tile-content>
        <v-list-tile-action>
          <v-icon>chat</v-icon>
        </v-list-tile-action>
      </v-list-tile>
      <v-divider inset></v-divider>
      <v-list-tile href="#">
        <v-list-tile-action>
          <v-icon color="indigo">mail</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>aliconnors@example.com</v-list-tile-title>
          <v-list-tile-sub-title>Personal</v-list-tile-sub-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile href="#">
        <v-list-tile-action></v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>ali_connors@example.com</v-list-tile-title>
          <v-list-tile-sub-title>Work</v-list-tile-sub-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-divider inset></v-divider>
      <v-list-tile href="#">
        <v-list-tile-action>
          <v-icon color="indigo">location_on</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>1400 Main Street</v-list-tile-title>
          <v-list-tile-sub-title>Orlando, FL 79938</v-list-tile-sub-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-card>
</template>

<script>
import {mapState} from 'vuex'
export default {
  data () {
    return {
      loading: true,
      editing: false,
      userId: null,
      userEmail: '',
      firstName: '',
      lastName: '',
      avatar: '',
      imageUrl: '',
      joined: '',
      updated: '',
      isAdmin: false,
      userLevel: 'free',
      editedFirstName: '',
      editedLastName: '',
      editedAvatar: '',
      image: null,
      imageExt: ''
    }
  },
  computed: {
    ...mapState('auth', [
      'user'
    ]),
  },
  mounted: function() {
    var self = this
    setTimeout(function(){
      self.userId = self.user.uid
      self.userEmail = self.user.email
      if(self.userProfile) {
        if (self.user.isAdmin) {
          self.isAdmin = self.user.isAdmin
        }
        if (self.user.userLevel) {
          self.userLevel = self.user.userLevel
        }
        if (self.user.joinDate) {
          self.joined = self.user.joinDate
        }
        if (self.user.updated) {
          self.updated = self.user.updated
        }
        if (self.user.firstName) {
          self.firstName = self.user.firstName
          self.editedFirstName = self.user.firstName
        }
        if (self.user.lastName) {
          self.lastName = self.user.lastName
          self.editedLastName = self.user.lastName
        }
        if (self.user.avatar) {
          self.avatar = self.user.avatar
          self.editedAvatar = self.user.avatar
        }
        if (self.user.imageUrl) {
          self.imageUrl = self.user.imageUrl
        }
        if (self.user.imageExt) {
          self.imageExt = 'https://firebasestorage.googleapis.com/v0/b/mirror2019-b60e0.appspot.com/o/users%2F'+self.user.uid+self.user.imageExt+'?alt=media'
        }
      }
      self.loading = false
    }, 2000)
  },
  methods: {
    onUpdateProfile () {
      this.editing = false
      const dateNow = new Date()
      this.$store.dispatch('updateUserData', {
        id: this.userId,
        firstName: this.editedFirstName,
        lastName: this.editedLastName,
        image: this.image,
        updated: dateNow
      })
      this.firstName = this.editedFirstName,
      this.lastName = this.editedLastName,
      this.avatar = this.editedAvatar
    },
    onCloseEdit () {
      this.editing = false
    },
    onClickEdit () {
      this.editing = true
    },
    onPickFile () {
      this.$refs.fileInput.click()
    },
    onFilePicked (event) {
      const files = event.target.files
      let fileName = files[0].name
      if (fileName.lastIndexOf('.') <= 0) {
        alert('Please add a valid image (.jpg, .png, .gif)')
      }
      const fileReader = new FileReader()
      fileReader.addEventListener('load', () => {
        this.imageUrl = fileReader.result
      })
      fileReader.readAsDataURL(files[0])
      this.image = files[0]
    }
  }
}
</script>
