<template>
  <div class="about">
    <h2>About To-Do App</h2>
    <p>
      To-Do App is a simple task manager that helps you keep track of the
      things you need to get done.
    </p>

    <h3>Features</h3>
    <ul>
      <li>Add new tasks</li>
      <li>Display the list of tasks</li>
      <li>Edit existing tasks and update their status</li>
      <li>Remove tasks you no longer need</li>
      <li>Your tasks are saved online with Firebase</li>
    </ul>

    <h3>Built With</h3>
    <ul>
      <li>Vue 3 and Vue Router</li>
      <li>Firebase</li>
      <li>Vite</li>
    </ul>
  </div>
</template>

<style scoped>
.about {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem 1rem;
  line-height: 1.6;
}

.about h2 {
  margin-top: 0;
}

.about h3 {
  margin-bottom: 0.5rem;
}

.about p,
.about li {
  color: #374151;
}
</style>
