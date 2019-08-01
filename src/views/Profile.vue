
<template>

  <v-layout justify-center>
    <v-dialog v-model="editing" fullscreen hide-overlay transition="dialog-bottom-transition">

      <!-- NON-EDIT MODE: SHOW PROFILE -->
      <template v-slot:activator="{ on }">

        <v-card
          max-width="375"
          class="mx-auto"
        >
          <v-card-title>
            <div class="display-1" v-show="user.isAdmin">ADMINISTRATOR</div>
            <v-spacer></v-spacer>
            
            <v-btn icon v-on="on" _class="mr-4">
              <v-icon>edit</v-icon>
            </v-btn>
          </v-card-title>

          <v-img
            v-if="user.photoURL"
            :src="user.photoURL"
            width="375"
            dark
          >
          </v-img>
          <v-img
            v-else
            :src="require('@/assets/default-avatar.jpg')"
            width="375"
            dark
          >
          </v-img>

          <v-list two-line>

            <v-list-item _click="">
              <v-list-item-icon>
                <v-icon color="indigo">person</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title> {{ (user.firstName ? user.firstName : 'unknown' ) }} </v-list-item-title>
                <v-list-item-subtitle>First name</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>

            <v-list-item _click="">
              <v-list-item-icon>
                <v-icon color="indigo">person</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title> {{ (user.lastName ? user.lastName : 'unknown') }} </v-list-item-title>
                <v-list-item-subtitle>Last name</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>

            <v-divider inset></v-divider>

            <v-list-item _click="">
              <v-list-item-icon>
                <v-icon color="indigo">mail</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>{{ (user.phone ? user.phone : 'unknown' ) }}</v-list-item-title>
                <v-list-item-subtitle>Email</v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-icon>
                <v-icon>chat</v-icon>
              </v-list-item-icon>
            </v-list-item>

            <v-list-item _click="">
              <v-list-item-icon>
                <v-icon color="indigo">phone</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>{{ (user.phone ? user.phone : 'unknown' ) }}</v-list-item-title>
                <v-list-item-subtitle>Phone</v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-icon>
                <v-icon>chat</v-icon>
              </v-list-item-icon>
            </v-list-item>

            <v-divider inset></v-divider>

            <v-list-item _click="">
              <v-list-item-icon>
                <v-icon color="indigo">person</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>{{ (user.userLevel ? user.userLevel : 'unknown' ) }}</v-list-item-title>
                <v-list-item-subtitle>user level</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            
          </v-list>
        </v-card>

      </template>

      <!-- EDIT MODE: SHOW DIALOG -->
      <v-card>
        <v-toolbar>
          <v-btn icon @click="onCancelEdit()">
            <v-icon>close</v-icon>
          </v-btn>
          <v-toolbar-title>Edit User Profile</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn text @click="onCloseEdit()">Save</v-btn>
          </v-toolbar-items>
        </v-toolbar>
        
        <v-list three-line subheader>
          <v-subheader>User Controls</v-subheader>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>Content filtering</v-list-item-title>
              <v-list-item-subtitle>Set the content filtering level to restrict apps that can be downloaded</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>Password</v-list-item-title>
              <v-list-item-subtitle>Require password for purchase or use password to restrict purchase</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
        <v-divider></v-divider>
        
        <v-list three-line subheader>
          <v-subheader>General</v-subheader>
          <v-list-item>
            <v-list-item-action>
              <v-checkbox v-model="notifications"></v-checkbox>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Notifications</v-list-item-title>
              <v-list-item-subtitle>Notify me about updates to apps or games that I downloaded</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-action>
              <v-checkbox v-model="sound"></v-checkbox>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Sound</v-list-item-title>
              <v-list-item-subtitle>Auto-update apps at any time. Data charges may apply</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-action>
              <v-checkbox v-model="widgets"></v-checkbox>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Auto-add widgets</v-list-item-title>
              <v-list-item-subtitle>Automatically add home screen widgets</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>

      </v-card>
    </v-dialog>

  </v-layout>
</template>

<script>
import {mapState} from 'vuex'
export default {
  data () {
    return {
      editing: false,
      //userFullName: '',
      /*
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
      imageExt: '',
      editing: false,
      profileDialog: true
      */
    }
  },
  computed: {
    ...mapState('auth', [
      'user'
    ]),
    //profileImage() { return this.photoURL ? this.photoURL : '@/assets/default-avatar.jpg' }

  },
  mounted: function() {
    //this.userFullName = this.user.firstName + ' ' + this.user.lastName

    /*
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
    */
    console.log("@/profile: user:")
    console.log(this.user)
  },
  methods: {
    /*
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
    */
    onCloseEdit () {
      this.editing = false
    },
    onCancelEdit () {
      this.editing = false
    },
    /*
    onClickEdit () {
      this.editing = true
    },
    */
    /*
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
    */
  }
}
</script>
