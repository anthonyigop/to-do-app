<script setup lang="js">
import { RouterView } from 'vue-router'
</script>

<template>
  <div class="app-container">
    <div class="header">
      <h1 class="text-header"><router-link to="/">To-Do App</router-link></h1>
      <nav class="nav-links">
        <router-link to="/" class="nav-button">Home</router-link>
        <router-link to="/about" class="nav-button">About</router-link>
      </nav>
    </div>
    <RouterView />
  </div>
</template>

<style>

*,
*::before,
*::after {
  box-sizing: border-box;
}

html,
body {
  margin: 0;
  padding: 0;
  font-family: system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
  color: #111827;
}

.header {
  position: sticky;
  top: 0;
  z-index: 1000;
  padding: 0 40px;
  height: 79px;
  background-color: #111d54;
  color: #f8fafc;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
}

.text-header {
  font-size: 25px;
  font-weight: 700;
  margin: 0;
}

.text-header a {
  color: inherit;
  text-decoration: none;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 24px;
}

.nav-button {
  color: #cbd5e1;
  font-size: 15px;
  font-weight: 400;
  text-decoration: none;
}

.nav-button:hover {
  color: #f8fafc;
}

.nav-button.router-link-active {
  color: #f8fafc;
  font-weight: 700;
}
</style>
