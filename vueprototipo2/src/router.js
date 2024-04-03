import Vue from 'vue';
import Router from 'vue-router';
import Alunos from './components/Aluno/AlunosEscola.vue';
import AlunoDetalhe from './components/Aluno/AlunoDetalhe.vue';
import Professores from './components/Professor/ProfessorEscola.vue';
import Sobre from './components/Sobre/SobreEscola.vue';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/professores',
            nome: 'Professores',
            component: Professores
        },
        {
            path: '/alunos/:prof_id',
            nome: 'Alunos',
            component: Alunos
        },
        {
            path: '/todosalunos',
            nome: 'Alunos',
            component: Alunos
        },
        {
            path: '/alunoDetalhe/:id',
            nome: 'AlunosDetalhe',
            component: AlunoDetalhe
        },
        {
            path: '/sobre',
            nome: 'Sobre',
            component: Sobre
        }
    ]
})