<template>
  <v-container fluid>
    <v-slide-y-transition mode="out-in">
      <v-layout column align-center>
        <v-btn :to="{ name: 'register' }">Register</v-btn>
      </v-layout>
    </v-slide-y-transition>
  </v-container>
</template>
