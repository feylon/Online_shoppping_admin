<template>
    <div class="h5 mt-3">Sotib olingan mahsulotlar</div>
    <div class="container">
        <table :class="store.document.dark ? 'table-dark table-striped ':''"  class="table">
          <thead>
        <tr >
          <th class="text-center" scope="col">#</th>
          <th class="text-center" scope="col">Nomi</th>
          <th class="text-center" scope="col">Mahsulot narxi</th>
          <th class="text-center" scope="col">Miqdori</th>
          <th class="text-center" scope="col">Umumiy narx</th>
    
        </tr>
      </thead>
      <tbody>
        <tr v-for="(i,j) in store.prevod" :key="j">
          <th class="text-center" scope="row">{{j + 1}}</th>
          <td class="text-center">{{i.nomi}}</td>
          <td class="text-center">{{i.narx}}</td>
          <td class="text-center">{{i.miqdor}}</td>
          <td class="text-center">{{i.hisob}}</td>
    
        </tr>
       
      </tbody>
    
      </table>
    </div>
    
    </template>
    <script setup>
    import { global_funksiya } from '../../store';
    let store = global_funksiya();
    </script>
    <style></style>