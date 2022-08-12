<template>
<div class="containment">
<div id ="view-sections">

    <h5>  Section {{this.section_id}} : {{this.stitle}}



    </h5>

<div class="row">
<form @submit.prevent="updateSection" class="col-s12">
<div class="col s4">
    <div class="input-field">
        <input disabled type="text" v-model="section_id" required>
         <span class="helper-text">Section ID#</span>
    </div>
   
</div>
<div class="col s4">
    <div class="input-field">
        <input disabled type="text" v-model="status" required>
         <span class="helper-text">Status</span>
    </div>
   
</div>

<div class="row">
    <div class="input-field col s4">
        <input disabled type="text" v-model="record" required>
         <span class="helper-text">Record #</span>

    </div>
</div>

<div class="col s4">
    <div class="input-field">
        <input disabled type="text" v-model="section" required>
         <span class="helper-text">Section</span>
    </div>

    

</div>
<div class="col s4">
    <div class="input-field">
        <input disabled type="text" v-model="stitle" required>
         <span class="helper-text">Title</span>
    </div>

</div>

<div class="row">
    <div class="input-field col s4">
        <input disabled type="text" v-model="name" required>
         <span class="helper-text">Name</span>
    </div>

</div>

<div class="row">
    <div class="input-field col s6">
          <p><label for="policyarea">Policy</label></p>
  <textarea disabled id="policyarea" name="policyarea" rows="15" cols="30">{{policy}}</textarea>
  <br>
          
         
    </div>
   
</div>
<div class="row">
    <div class="input-field col s6">
          <p><label for="modarea">Modification</label></p>
  <textarea disabled id="modarea" name="modarea" rows="15" cols="30">{{modification}}</textarea>
  <br>
          
         
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
            <v-btn v-bind:to="{name:'edit-sections', params: {section_id: section_id}}" class="waves-effect waves-light btn red" 
              
              color="red"
              dark
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

import db from './firebaseInit'
import router from '../router'
export default {

name: 'view-sections',
data () {
    return {
     section_id: null,
     name: null,
     policy: null,
     section: null,
     status: null,
     stitle: null,
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
                vm.stitle = doc.data().stitle
                vm.policy = doc.data().policy
                vm.record = doc.data().record
                vm.modification = doc.data().modification
                
            })
        })
    })
    
},
watch: {
    '$route': 'fetchData'
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
    padding-left: 350px;

}

i {
    color: aliceblue;
}



</style>