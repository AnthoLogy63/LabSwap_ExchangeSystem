#!/bin/bash

# Asegúrate de estar en main
git switch main

# Lista de ramas a sincronizar
branches=(
  "feature/home-page"
  "feature/login-page"
  "feature/user-courses-page"
  "feature/user-edit-courses"
  "feature/user-profile-page"
  "feature/user-contact-swap"
  "feature/admin-course-panel"
  "feature/admin-history-panel"
)

for branch in "${branches[@]}"
do
  echo "🔁 Cambiando a $branch"
  git switch $branch

  echo "📦 Reemplazando contenido por el de main"
  git reset --hard main

  echo "🚀 Pusheando cambios a $branch"
  git push --force

  echo "✅ Listo en $branch"
  echo "-----------------------------"
done

# Volver a main al final
git switch main
echo "🎉 Todas las ramas fueron sincronizadas con main"
