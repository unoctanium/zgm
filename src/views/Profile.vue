
<template>

<v-card
  max-width="375"
  class="mx-auto"
>
  <v-img
    :src="require('@/assets/default-avatar.jpg')"
    width="375"
    dark
  >
    <v-layout
      column
      fill-height
    >
      <v-card-title>
        
        <v-spacer></v-spacer>

        <v-btn dark icon class="mr-4">
          <v-icon>edit</v-icon>
        </v-btn>
        
      </v-card-title>

      <v-spacer></v-spacer>

      <v-card-title class="white--text pl-12 pt-12">
        <div class="display-1 pl-12 pt-12">{{ (user.firstName ? user.firstName : '' ) + ' ' + (user.lastName ? user.lastName : '') }}</div>
      </v-card-title>
    </v-layout>
  </v-img>

  <v-list two-line>
    <!--
    <v-list-item _click="">
      <v-list-item-icon>
        <v-icon color="indigo">phone</v-icon>
      </v-list-item-icon>

      <v-list-item-content>
        <v-list-item-title>(650) 555-1234</v-list-item-title>
        <v-list-item-subtitle>Mobile</v-list-item-subtitle>
      </v-list-item-content>

      <v-list-item-icon>
        <v-icon>chat</v-icon>
      </v-list-item-icon>
    </v-list-item>

    <v-list-item _click="">
      <v-list-item-action></v-list-item-action>

      <v-list-item-content>
        <v-list-item-title>(323) 555-6789</v-list-item-title>
        <v-list-item-subtitle>Work</v-list-item-subtitle>
      </v-list-item-content>

      <v-list-item-icon>
        <v-icon>chat</v-icon>
      </v-list-item-icon>
    </v-list-item>

    <v-divider inset></v-divider>

    <v-list-item _click="">
      <v-list-item-icon>
        <v-icon color="indigo">mail</v-icon>
      </v-list-item-icon>

      <v-list-item-content>
        <v-list-item-title>aliconnors@example.com</v-list-item-title>
        <v-list-item-subtitle>Personal</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>

    <v-list-item _click="">
      <v-list-item-action></v-list-item-action>

      <v-list-item-content>
        <v-list-item-title>ali_connors@example.com</v-list-item-title>
        <v-list-item-subtitle>Work</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>

    <v-divider inset></v-divider>

    <v-list-item _click="">
      <v-list-item-icon>
        <v-icon color="indigo">location_on</v-icon>
      </v-list-item-icon>

      <v-list-item-content>
        <v-list-item-title>1400 Main Street</v-list-item-title>
        <v-list-item-subtitle>Orlando, FL 79938</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
    -->
  </v-list>
</v-card>



<!--
  <v-card tile flat hover class="justify-center">
    <v-layout justify-center>
      <v-avatar size='144' class="my-3 justify-center">
        <v-img :src="require('@/assets/default-avatar.jpg')" />
      </v-avatar>
    
    </v-layout>
    <v-card-title class="headline text-center py-0"> {{ (user.firstName ? user.firstName : '' ) + ' ' + (user.lastName ? user.lastName : '') }} </v-card-title>  
    <v-card-text class="text-md-center pt-1 pb-4">Project Manager</v-card-text>
  </v-card>

-->
<!--
  <v-card>

    <v-img :src="require('@/assets/default-avatar.jpg')" height="100%">
      <v-layout column class="media ma-0">
        <v-card-title>

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
          <div class="display-1 pl-5 pt-5">{{ (user.firstName ? user.firstName : '' ) + ' ' + (user.lastName ? user.lastName : '') }}</div>
        </v-card-title>
      </v-layout>
    </v-img>
  </v-card>

  -->


<!--
  <v-card>
    <v-img src="/static/people/man/m1.jpg" height="390">
      <v-layout column class="media ma-0">
        <v-card-title>

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
  -->
  <!--
<v-layout row justify-center>
  <v-dialog persistent v-model="profileDialog" max-width="500px">
    <v-card>
      <v-card-title>
        <span class="headline"> jo </span>
      </v-card-title>

     
      <v-form v-model="userValid">
        <v-card-text>
         
     
          <v-text-field
            :label="Login"
            v-model="login"
            :rules="loginRules"
            :required="loginEditable"
            :disabled="!loginEditable"
          ></v-text-field>
          
          
        </v-card-text>
        <v-card-actions>
          <v-btn
            class="blue--text"
            flat
            @click="getUser()"
          >
            RESTORE
          </v-btn>
          
        </v-card-actions>
      </v-form>


    </v-card>
  </v-dialog>
</v-layout>
-->

</template>

<script>
import {mapState} from 'vuex'
export default {
  data () {
    return {
      userFullName: '',
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

  },
  mounted: function() {
    this.userFullName = this.user.firstName + ' ' + this.user.lastName


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
    console.log("@/profile: user:")
    console.log(this.user)
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
