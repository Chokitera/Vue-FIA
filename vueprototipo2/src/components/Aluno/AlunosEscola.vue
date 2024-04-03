<template>
  <div>
    <titulo :texto=" professorid != undefined ? 'Professor: ' + professor.nome : 'Todos os Alunos'"/>
    <div v-if="professorid != undefined">
      <input type="text" placeholder="Nome do Aluno" v-model="nome"
      v-on:keyup.enter="addAluno()">
      <button class="btn btnInput" @click="addAluno()">Adicionar</button>
    </div>

    <!-- table(thread>th*3)+tbody>tr>td*3 -->
    <table>
      <thead>
      <th>Mat.</th>
      <th>Nome</th>
      <th>Opções</th>
    </thead>
    <tbody v-if="alunos.length">
      <tr v-for="(aluno, index) in alunos" :key="index">
        <td class="colPequeno" style="width: 10%;">{{ index+1 }}</td>
        <!--<td>{{aluno.id}}</td>-->
        <router-link 
        :to="`/alunoDetalhe/${aluno.id}`" 
        tag="td"
        style="cursor: pointer;">
          {{aluno.nome}} {{ aluno.sobrenome }}
        </router-link>
        <td class="colPequeno">
          <!--<button class="btn btn_danger" @click="remover(aluno)">Editar</button>-->
          <button class="btn btn_danger" @click="remover(aluno)">Remover</button>
        </td>
      </tr>
    </tbody>
    <tfoot v-if="!alunos.length">
      Nenhum Aluno Encontrado!
    </tfoot>
    </table>
  </div>
</template>

<script>

import Titulo from '../_share/TituloPagina.vue';

export default {
  components: {
    Titulo
  },
  data() {
    return {
      titulo: 'Aluno',
      professorid: this.$route.params.prof_id,
      professor: {

      },
      nome: '',
      alunos: []
    }
  },
  created(){
    if(this.professorid){
      this.carregarProfessores(this.professorid);
      this.$http
      .get('http://localhost:3000/alunos?professor.id=' + this.professorid )
      .then(res => res.json())
      .then(alunos => this.alunos = alunos)
    }
    else {
      this.$http
        .get('http://localhost:3000/alunos')
        .then(res => res.json())
        .then(alunos => this.alunos = alunos)
    }
  },
  props: {
    
  },
  methods: {
    addAluno() {
      let _aluno = {
        nome: this.nome,
        sobrenome: "",
        professor: {
          id: this.professor.id,
          nome: this.professor.nome
        }
      }

      this.$http
        .post('http://localhost:3000/alunos', _aluno)
        .then(res => res.json())
        .then(alunoRetornado => {
          this.alunos.push(alunoRetornado);
          this.nome = ''
        })
      //this.alunos.forEach(aluno => {
      //  console.log(aluno);
      //});

      this.$forceUpdate();
    },
    remover(aluno){

      this.$http
        .delete(`http://localhost:3000/alunos/${aluno.id}`)
        .then(() => {
          let indice = this.alunos.indexOf(aluno);
          this.alunos.splice(indice, 1);
        })
    },
    carregarProfessores(professorid){
            this.$http
                .get('http://localhost:3000/professores/' + professorid)
                .then(res => res.json())
                .then(professor => {
                    this.professor = professor;
                })
        }
  },
}
</script>

<style scoped>
input {
  width: calc(100% - 195px);
  border: 0;
  padding: 20px;
  font-size: 1.3em;
  color: #687f7f;
  display: inline;
}

.btnInput {
  width: 150px;
  border: 0px;
  padding: 20px;
  font-size: 1.3em;
  background-color: rgb(116, 115, 115);
  display: inline;
}

.btnInput:hover {
  padding: 20px;
  margin: 0px;
  border: 0px;
}
</style>
