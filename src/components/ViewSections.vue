<template>
<div class="containment">
<div id ="view-sections">

    <h5>  Section {{this.section_id}} : {{this.sectiontitle}}



    </h5>

<div class="row">
<form @submit.prevent="updateSection" class="col-s12">
<div class="col s4">
    
        <v-text-field disabled type="text" v-model="section_id" required></v-text-field>
         <span class="helper-text">Section ID#</span>
   
   
</div>
<div class="col s4">
    
        <v-text-field input disabled type="text" v-model="status" required></v-text-field>
         <span class="helper-text">Status</span>
    
   
</div>

<div class="row">
    <div class="col s4">
        <v-text-field disabled type="text" v-model="record" required></v-text-field>
         <span class="helper-text">Record #</span>

    </div>
</div>

<div class="col s4">
    
        <v-text-field disabled type="text" v-model="section" required></v-text-field>
         <span class="helper-text">Section</span>
    

    

</div>
<div class="col s4">
    
        <v-text-field disabled type="text" v-model="sectiontitle" required></v-text-field>
         <span class="helper-text">Title</span>
    

</div>

<div class="row">
    <div class="col s4">
        <v-text-field disabled type="text" v-model="name" required></v-text-field>
         <span class="helper-text">Name</span>
    </div>

</div>

<div class="row">
  
    <div>
    <v-tabs
      v-model="active"
      color="cyan"
      slider-color="yellow"
    >
      <v-tab
       @click="back"
       >
        Policy

      </v-tab>
         <v-tab
       @click="next"
       >
        modification

      </v-tab>
      <v-tab-item
      
      >
        <v-card flat>
          
          <v-card-text>

<div v-if="editor">
<div class="tapbuttons">
    <button class="btn bold" @click="editor.chain().focus().toggleBold().run()">
      <i class="fa-solid fa-bold"></i>
    </button>
     <button class="btn italic" @click="editor.chain().focus().toggleItalic().run()">
    <i class="fa-solid fa-italic fa-1x"></i>
    </button>
    <button class="btn strike" @click="editor.chain().focus().toggleStrike().run()">
      <i class="fa-solid fa-strikethrough"></i>
    </button>
      <button class="btn listb" @click="editor.chain().focus().toggleBulletList().run()">
      <i class="fa-solid fa-list-ul"></i>
    </button>
    <button class="btn listn" @click="editor.chain().focus().toggleOrderedList().run()">
      <i class="fa-solid fa-list-ol"></i>
    </button>
  <button class="btn undo" @click="editor.chain().focus().undo().run()">
      <i class="fa-solid fa-rotate-left"></i>
    </button>
    <button class="btn redo" @click="editor.chain().focus().redo().run()">
      <i class="fa-solid fa-rotate-right"></i>
    </button>

    </div>
  </div>
  <editor-content :editor="editor" />

          </v-card-text>
          
        </v-card>

        
      </v-tab-item>

            <v-tab-item
      
      >
        <v-card flat>
          
          <v-card-text>

<div v-if="editor"
editable: false>
<div class="tapbuttons">
    <button class="btn bold" @click="editor.chain().focus().toggleBold().run()">
      <i class="fa-solid fa-bold"></i>
    </button>
     <button class="btn italic" @click="editor.chain().focus().toggleItalic().run()">
    <i class="fa-solid fa-italic fa-1x"></i>
    </button>
    <button class="btn strike" @click="editor.chain().focus().toggleStrike().run()">
      <i class="fa-solid fa-strikethrough"></i>
    </button>
      <button class="btn listb" @click="editor.chain().focus().toggleBulletList().run()">
      <i class="fa-solid fa-list-ul"></i>
    </button>
    <button class="btn listn" @click="editor.chain().focus().toggleOrderedList().run()">
      <i class="fa-solid fa-list-ol"></i>
    </button>
  <button class="btn undo" @click="editor.chain().focus().undo().run()">
      <i class="fa-solid fa-rotate-left"></i>
    </button>
    <button class="btn redo" @click="editor.chain().focus().redo().run()">
      <i class="fa-solid fa-rotate-right"></i>
    </button>

    </div>
  </div>
  
  <editor-content :editor="editor" />
 

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
              v-bind:to="{name: 'edit-sections', params: {section_id}}"
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
     section: null,
     status: null,
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
                
            })
        })
    })
    
},
mounted() {
    this.editor = new Editor({
      extensions: [
        StarterKit,
      ],
      content: this.policy,
     
    })
  },

  beforeUnmount() {
    this.editor.destroy()
  },




methods: {
      next () {
    
       this.editor.commands.setContent({
  "type": "doc",
  "content": [
    {
      "type": "text",
      "text": this.modification
      
      }
  ]
})
       
        
      },

back () {

       this.editor.commands.setContent({
  "type": "doc",
  "content": [
    {
      "type": "text",
      "text": this.policy
      
      }
  ]
})
       
        
      },
          editSection (){
       
     router.push({name: 'edit-sections', params : {section_id}})
        
    }

    }

}


</script>

<style>


.containment {
    display: flex;
    justify-content: center;
 
}

#view-sections {
    text-align:center;
    justify-content: center;
  
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

label {

    text-align: center;
    padding-left: 185px;
    font-size: larger;
    font-weight: 700;
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