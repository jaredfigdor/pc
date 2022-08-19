<template>
<div class="wrapper">
<v-layout row class="mt-8">
    <v-flex xs12 sm6 offset-sm3>
      <v-card>
        <v-toolbar color="teal" dark>
          <v-app-bar-nav-icon></v-app-bar-nav-icon>

          <v-toolbar-title>Volumes</v-toolbar-title>

          <v-spacer></v-spacer>

          <v-btn icon>
            
          </v-btn>
        </v-toolbar>

        <v-list>
          <v-list-group
            v-for="item in items"
            :key="item.title"
            v-model="item.active"
          
          >
            <template v-slot:activator>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>{{item.title}}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </template>

            <v-list-item
              v-for="subItem in item.items"
              :key="item.section_id"
               v-bind:to="{name: 'view-sections', params: {section_id: subItem.section_id}}">
              
              
            
              <v-list-item-content>
                <v-list-item-title>{{subItem.sectiontitle}}</v-list-item-title>
              </v-list-item-content>

         
            </v-list-item>
          </v-list-group>
        </v-list>
      </v-card>
    </v-flex>
  </v-layout>



</div>

</template>

<script>
import db from './firebaseInit'
import router from '../router'
  export default {
    data () {
      return {
        section_id: null,
     name: null,
     policy: null,
     section: null,
     status: null,
     record: null,
     sectiontitle: null,
     islocked: null,
        volume1: [],
        items: [
          {
            title : 'Volume 1' ,
           items: []
            
            
            },
            {
              title : 'Volume 2'
            }
            
          
        ]
        
      }
    },
created () {
    db.collection('volumes').get().then(querySnapshot => {
        querySnapshot.forEach(doc => {
            console.log(doc.data())
                      const data = {
                'id': doc.id,
                'volumes': doc.data().volume,
                'name': doc.data().name,
                'section': doc.data().section,
                'islocked': doc.data().islocked,
                'section_id': doc.data().section_id,
                'sectiontitle': doc.data().sectiontitle,
                'policy' : doc.data().policy,
                'modification' : doc.data().modification,
                'islocked' : false
            }
           
            this.items[0]['items'].push(data)
           
            
        })
    })
},

watch: {
    '$route': 'showSection'
},
methods: {
    fetchData () {
        db.collection('volumes').where('section_id', '==', this.$route.params.section_id).get()
        .then(querySnapshot => {
            querySnapshot.forEach(doc => {
               
                this.section_id = doc.data().section_id
                this.name = doc.data().name
                this.section = doc.data().section
                this.status = doc.data().status
                this.sectiontitle = doc.data().sectiontitle
                this.policy = doc.data().policy
                this.record = doc.data().record
                this.islocked = doc.data().islocked
                this.modification = doc.data().modification
                
                
            
            })
        })
    },
       showSection (){
     router.push({name: 'view-sections', params : {section_id: subItem.section_id}})
        
    }
}

  }
</script>

<style>

v-layout.row {
  padding-top: 100 px;
}

</style>