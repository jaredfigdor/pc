<template>
<div class="containment">
<div id ="view-sections">
<div class="titlew">


    <h5 class="solid">  Section {{this.section_id}} - {{this.sectiontitle}}



    </h5>
</div>
<div class="row">
<form @submit.prevent="updateSection" class="col-s12">
<div class="col s4">
    
        <v-text-field label="Section ID#" disabled outlined v-model="section_id" required></v-text-field>

   
   
</div>
<div class="col s4">
    
        <v-text-field label="Status" disabled outlined v-model="status" required></v-text-field>

    
   
</div>

<div class="row">
    <div class="col s4">
        <v-text-field label="Record #" disabled outlined v-model="record" required></v-text-field>


    </div>
</div>

<div class="col s4">
    
        <v-text-field label="Policy Section" disabled outlined v-model="section" required></v-text-field>

    

    

</div>
<div class="col s4">
    
        <v-text-field label="Policy Title" disabled outlined v-model="sectiontitle" required></v-text-field>

    

</div>

<div class="row">
    <div class="col s4">
        <v-text-field label="Volume Name" disabled outlined v-model="name" required></v-text-field>

    </div>

</div>

<div class="row">
  
    <div>
    <v-tabs
      v-model="active"
      color="blue"
      slider-color="blue"
    >
      <v-tab
    
       >
        Policy

      </v-tab>
         <v-tab
     
       >
        modification

      </v-tab>
      <v-tab-item
      
      >
        <v-card flat>
          
          <v-card-text>

<div v-if="editorPolicy">
<div class="tapbuttons">


    </div>
  </div>
  <editor-content :editor="editorPolicy" />

          </v-card-text>
          
        </v-card>

        
      </v-tab-item>

            <v-tab-item
      
      >
        <v-card flat>
          
          <v-card-text>

<div v-if="editorMod"
editable: false>
<div class="tapbuttons">


    </div>
  </div>
  
  <editor-content :editor="editorMod" />
 

          </v-card-text>
          
        </v-card>

        
      </v-tab-item>

      
    </v-tabs>


  </div>

</div>

<div class="buttons">
<div class="col">
            <v-btn to="/"
              color="grey"
              dark
            >
              Back
            </v-btn>
          </div>
          <div class="col">
            <v-btn  
              
              color="red"
              dark
             type="submit"
            >
            <i class= "fa fa-unlock"> </i>
               Unlock
            </v-btn>
          </div>




</div>

</form>
</div>

</div>
</div>



</template>

<script>
import { Editor, EditorContent } from '@tiptap/vue-2'
import StarterKit from '@tiptap/starter-kit'
import Text from '@tiptap/extension-text'
import db from './firebaseInit'
import router from '../router'
export default {
components: {EditorContent,},
name: 'view-sections',
 props: {
    value: {
      type: String,
      default: '',
    },
  },
data () {
    return {
      editor: null,
        active: null,
     section_id: null,
     name: null,
     policy: null,
     editorMod: null,
     editorPolicy: null,
     section: null,
     status: null,
     sectiontitle: null,
     record: null,
     islocked: null,
     modification: null
    }
},
beforeRouteEnter(to, from, next) {
    db.collection('volumes').where('section_id','==', to.params.section_id).get()
    .then(querySnapshot => {
        querySnapshot.forEach(doc => {
            next(vm => {
                vm.section_id = doc.data().section_id
                vm.name = doc.data().name
                vm.section = doc.data().section
                vm.status = doc.data().status
                vm.sectiontitle = doc.data().sectiontitle
                vm.policy = doc.data().policy
                vm.record = doc.data().record
                vm.modification = doc.data().modification
                vm.islocked = doc.data().islocked
                
            })
        })
    })
    
},
  mounted() {
    this.editorPolicy = new Editor({
      extensions: [
        StarterKit,
      ],
       editable: false,
      content: this.policy,
     
    })

        this.editorMod = new Editor({
          
      extensions: [
        StarterKit,
      ],
       editable: false,
      content: this.modification,
     
    })
    
  },

  beforeUnmount() {
     editorPolicy.setEditable(false)
  },


watch: {
    '$route': 'fetchData'
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
                this.title = doc.data().title
                this.policy = doc.data().policy
                this.record = doc.data().record
                this.modification = doc.data().modification
                 this.sectiontitle = doc.data().sectiontitle
                 this.islocked = doc.data().islocked
            })
        })
    },

          updateSection (){
             db.collection('volumes').where('section_id', '==', this.$route.params.section_id).get()
        .then(querySnapshot => {
            querySnapshot.forEach(doc => {
              doc.ref.update({
      
                islocked: false,
      
         
              })
           
            })
        })
     router.push({name: 'edit-sections', params : {section_id : this.section_id}})
     
        
    }

    }

}


</script>

<style>

h5 {
  font-weight: 300;
  padding-top: 10px;
  margin-top: -1px;


}



.containment {
    display: flex;
    justify-content: center;
 
}

#view-sections {
    text-align:center;
    justify-content: center;
     border-color: #1976D2;

}



form.col-s12 {
    width: 1400px;
    margin-left: 200px;
    padding-right: 200px;
    margin-right: auto;
    text-align: center;
  
}

textarea {
    width: 550px;
    border:solid 1px green !important; 
}

input {
    text-align: center;
}




span {
    
    font-weight: 700;
    
}



.buttons {
    padding-left: 375px;

}

button.btn.bold {
  padding-left: 0px;
  padding-right: 0px;
  padding-top: 0px;
  padding-bottom: 0px;
  margin-bottom: 0px;
    border: 1px solid black;
  border-radius: 5px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
flex-direction: row;
box-shadow: none;
  background-color: white;
  color: black;
   width: 30px;
    height: 20px;
  font-size: 14px;
  cursor: pointer;
}

button.btn.italic {
  padding-left: 0px;
  padding-right: 0px;
  padding-top: 0px;
  padding-bottom: 0px;
  margin-bottom: 0px;
    border: 1px solid black;
  border-radius: 5px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
flex-direction: row;
margin-left: 40px;
margin-top: -20px;
  background-color: white;
  color: black;
 box-shadow: none;
  font-size: 14px;
  cursor: pointer;
    width: 30px;
    height: 20px;
}

button.btn.listb {
  padding-left: 0px;
  padding-right: 0px;
  padding-top: 0px;
  padding-bottom: 0px;
  margin-bottom: 0px;
    border: 1px solid black;
  border-radius: 5px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
flex-direction: row;
margin-left: 120px;
margin-top: -20px;
  background-color: white;
  color: black;
 box-shadow: none;
  font-size: 14px;
  cursor: pointer;
    width: 30px;
    height: 20px;
}

button.btn.listn {
  padding-left: 0px;
  padding-right: 0px;
  padding-top: 0px;
  padding-bottom: 0px;
  margin-bottom: 0px;
    border: 1px solid black;
  border-radius: 5px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
flex-direction: row;
margin-left: 160px;
margin-top: -20px;
  background-color: white;
  color: black;
 box-shadow: none;
  font-size: 14px;
  cursor: pointer;
    width: 30px;
    height: 20px;
}


button.btn.strike {
  box-shadow: none;
padding-left: 0px;
  padding-right: 0px;
  padding-top: 0px;
  padding-bottom: 0px;
  margin-bottom: 0px;
    border: 1px solid black;
  border-radius: 5px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
flex-direction: row;
margin-left: 80px;
margin-top: -20px;
  background-color: white;
  color: black;
 width: 60px;
  font-size: 14px;
  cursor: pointer;
    width: 30px;
    height: 20px;
}

button.btn.undo {
  box-shadow: none;
padding-left: 0px;
  padding-right: 0px;
  padding-top: 0px;
  padding-bottom: 0px;
  margin-bottom: 0px;
    border: 1px solid black;
  border-radius: 5px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
flex-direction: row;
margin-left: 200px;
margin-top: -20px;
  background-color: white;
  color: black;
 width: 60px;
  font-size: 14px;
  cursor: pointer;
    width: 30px;
    height: 20px;
}

button.btn.redo {
  box-shadow: none;
padding-left: 0px;
  padding-right: 0px;
  padding-top: 0px;
  padding-bottom: 0px;
  margin-bottom: 0px;
    border: 1px solid black;
  border-radius: 5px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
flex-direction: row;
margin-left: 240px;
margin-top: -20px;
  background-color: white;
  color: black;
 width: 60px;
  font-size: 14px;
  cursor: pointer;
    width: 30px;
    height: 20px;
}

i.fa-solid.fa-italic {

  color: black;
  font-size: 12px;
}

i.fa-solid.fa-list-ul {

  color: black;
  font-size: 12px;
}

i.fa-solid.fa-list-ol {

  color: black;
  font-size: 12px;
}

i.fa-solid.fa-bold {

  color: black;
  font-size: 12px;
}

i.fa-solid.fa-strikethrough {

  color: black;
  font-size: 12px;
}

i.fa-solid.fa-rotate-left {

  color: black;
  font-size: 12px;
}

i.fa-solid.fa-rotate-right {

  color: black;
  font-size: 12px;
}



.btn {

 
 margin-bottom: 40px;

 

}

.btn:hover {

    opacity:0.6;
  filter:alpha(opacity=60);
}

.tapbuttons {

  margin-bottom: 10px;
}

.success {
  border-color: #04AA6D;
  color: green;
}

i {
    color: aliceblue;
}
</style>
<style lang="scss">
.ProseMirror {
  > * + * {
    margin-top: 0.75em;
  }

  ul,
  ol {
    padding: 0 1rem;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    line-height: 1.1;
  }

  code {
    background-color: rgba(#616161, 0.1);
    color: #616161;
  }

  pre {
    background: #0D0D0D;
    color: #FFF;
    font-family: 'JetBrainsMono', monospace;
    padding: 0.75rem 1rem;
    border-radius: 0.5rem;

    code {
      color: inherit;
      padding: 0;
      background: none;
      font-size: 0.8rem;
    }
  }

  img {
    max-width: 100%;
    height: auto;
  }

  blockquote {
    padding-left: 1rem;
    border-left: 2px solid rgba(#0D0D0D, 0.1);
  }

  hr {
    border: none;
    border-top: 2px solid rgba(#0D0D0D, 0.1);
    margin: 2rem 0;
  }
}

</style>