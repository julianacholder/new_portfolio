function openNav() {
  document.getElementById("myNav").style.height = "100%";
}

function closeNav() {
  document.getElementById("myNav").style.height = "0%";
}

function resetForm() {
  document.querySelector('.input-field').reset();
}

document.addEventListener('DOMContentLoaded', async () => {
  const likeButton = document.getElementById('heart');
  const likeCountOne = document.querySelector('.like-count.one');
  const likeCountTwo = document.querySelector('.like-count.two');

  // Reference to the like count document in Firestore
  const likeRef = db.collection('likes').doc('likeCount');

  // Fetch the current like count
  const doc = await likeRef.get();
  let likes = doc.exists ? doc.data().count : 68; // Default to 68 if no value in Firestore
  likeCountOne.textContent = likes;
  likeCountTwo.textContent = +likes + 1;

  // Handle the like button toggle
  likeButton.addEventListener('change', async () => {
    if (likeButton.checked) {
      likes++;
    } else {
      likes--;
    }

    // Update like counts in the UI
    likeCountOne.textContent = likes;
    likeCountTwo.textContent = +likes + 1;

    // Update the count in Firestore
    await likeRef.set({ count: likes });
  });
});
