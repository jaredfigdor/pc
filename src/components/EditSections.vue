<template>
<div class="containment">
<div id ="view-sections">

    <h5>  Section {{this.section_id}} : {{this.sectiontitle}}



    </h5>

<div class="row">
<form class="col-s12">
<div class="col s4">
    
        <v-text-field  label="Section ID#" outlined v-model="section_id" required></v-text-field>
        
   
   
</div>
<div class="col s4">
    
        <v-text-field label="Status" outlined v-model="status" required></v-text-field>

    
   
</div>

<div class="row">
    <div class="col s4">
        <v-text-field  label="Record #" outlined v-model="record" required></v-text-field>
  

    </div>
</div>

<div class="col s4">
    
        <v-text-field label="Policy Section" outlined v-model="section" required></v-text-field>

    

    

</div>
<div class="col s4">
    
        <v-text-field  label="Policy Title" outlined v-model="sectiontitle" required></v-text-field>

    

</div>

<div class="row">
    <div class="col s4">
        <v-text-field  label="Volume Name" outlined v-model="name" required></v-text-field>
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
        Modification

      </v-tab>
      <v-tab-item
      
      >
        <v-card flat>
          
          <v-card-text>

<div v-if="editorPolicy">
<div class="tapbuttons">
    <button class="btn bold" @click="editorPolicy.chain().focus().toggleBold().run()">
      <i class="fa-solid fa-bold"></i>
    </button>
     <button class="btn italic" @click="editorPolicy.chain().focus().toggleItalic().run()">
    <i class="fa-solid fa-italic fa-1x"></i>
    </button>
    <button class="btn strike" @click="editorPolicy.chain().focus().toggleStrike().run()">
      <i class="fa-solid fa-strikethrough"></i>
    </button>
      <button class="btn listb" @click="editorPolicy.chain().focus().toggleBulletList().run()">
      <i class="fa-solid fa-list-ul"></i>
    </button>
    <button class="btn listn" @click="editorPolicy.chain().focus().toggleOrderedList().run()">
      <i class="fa-solid fa-list-ol"></i>
    </button>
  <button class="btn undo" @click="editorPolicy.chain().focus().undo().run()">
      <i class="fa-solid fa-rotate-left"></i>
    </button>
    <button class="btn redo" @click="editorPolicy.chain().focus().redo().run()">
      <i class="fa-solid fa-rotate-right"></i>
    </button>

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

<div v-if="editorMod">
<div class="tapbuttons">
    <button class="btn bold" @click="editorMod.chain().focus().toggleBold().run()">
      <i class="fa-solid fa-bold"></i>
    </button>
     <button class="btn italic" @click="editorMod.chain().focus().toggleItalic().run()">
    <i class="fa-solid fa-italic fa-1x"></i>
    </button>
    <button class="btn strike" @click="editorMod.chain().focus().toggleStrike().run()">
      <i class="fa-solid fa-strikethrough"></i>
    </button>
      <button class="btn listb" @click="editorMod.chain().focus().toggleBulletList().run()">
      <i class="fa-solid fa-list-ul"></i>
    </button>
    <button class="btn listn" @click="editorMod.chain().focus().toggleOrderedList().run()">
      <i class="fa-solid fa-list-ol"></i>
    </button>
  <button class="btn undo" @click="editorMod.chain().focus().undo().run()">
      <i class="fa-solid fa-rotate-left"></i>
    </button>
    <button class="btn redo" @click="editorMod.chain().focus().redo().run()">
      <i class="fa-solid fa-rotate-right"></i>
    </button>

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
            <v-btn 
              color="red"
              dark
              @click="changeLock"
            >
              Cancel 
            </v-btn>
          </div>
          <div class="col">
            <v-btn  
              
              color="blue"
              dark
              @click="saveSection"
            >
            <i class= "fa fa-unlock"> </i>
               Save
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
const Swal = require('sweetalert2')
export default {
components: {EditorContent,},
name: 'edit-sections',
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
     policy: '',
       editorMod: null,
     editorPolicy: null,
     section: null,
     status: null,
     islocked: null,
     sectiontitle: null,
     record: null,
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


  async mounted() {
  
    this.editorPolicy = new Editor({
      
      extensions: [
        StarterKit,
      ],
      autofocus: true,
      content: this.policy,
    
     
    })

        this.editorMod = new Editor({
      extensions: [
        StarterKit,
      ],
      autofocus: true,
      content: this.modification,
     
    })
  },

  beforeUnmount() {
    this.editor.destroy()

  },




methods: {



saveSection () {
               Swal.fire({
  title: 'Do you want to save the changes?',
  showCancelButton: true,
  confirmButtonText: 'Save',
}).then((result) => {
  /* Read more about isConfirmed, isDenied below */
  if (result.isConfirmed) {
    Swal.fire('Saved!', '', 'success')
    this.updateSection() 
    
  } else if (result.isDenied) {
    Swal.fire('Changes are not saved', '', 'info')
  }
})
},


          changeLock (){
             db.collection('volumes').where('section_id', '==', this.$route.params.section_id).get()
        .then(querySnapshot => {
            querySnapshot.forEach(doc => {
              doc.ref.update({
      
                islocked: true,
      
         
              })
           
            })
        })
     router.push({name: 'home'})
     
        
    },

 
    updateSection () {
      const html = this.editorPolicy.getHTML()
      const htmltwo = this.editorMod.getHTML()
        db.collection('volumes').where('section_id', '==', this.$route.params.section_id).get()
        .then(querySnapshot => {
            querySnapshot.forEach(doc => {
              doc.ref.update({
                section_id: this.section_id,
                name: this.name,
                section: this.section,
                status: this.status ,
                sectiontitle: this.sectiontitle,
                policy: html,
                islocked: true,
                record: this.record,
                modification: htmltwo
         
              })
           
            })
        })
    },
       deleteSection (){
        if(confirm('Are you sure')){
        db.collection('volumes').where('section_id', '==', this.$route.params.section_id).get()
        .then(querySnapshot => {
            querySnapshot.forEach(doc => {
                doc.ref.delete()
                this.$router.push('/')
            })
        })
        }
    }

    }

}


</script>

<style>


h5 {
  padding-bottom: 20px;
}

.containment {
    display: flex;
    justify-content: center;
 
}

p {
  text-align: justify;
}

#view-sections {
    text-align:center;
    justify-content: center;
    background-color: white;
    box-shadow: 0px 0px 25px 1px #888888;
    height: 700px
  
}

form.col-s12 {
    width: 1200px;
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
    
    font-weight: 500;
    
}



.buttons {
    padding-left: 375px;

}

.buttons .col {

  padding-right: 0px;
}

.buttons .col {

  padding-right: 0px;
}

i.material-icons {
  padding-left: 0px;
  padding-right: 0px;
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