export default function renderLoading(popup, loading, text = 'Сохранить') {
  const activePopup = document.querySelector(popup);
  const button = activePopup.querySelector('.popup__submit-button');
  button.textContent = loading ? 'Сохранение...' : text;
}
