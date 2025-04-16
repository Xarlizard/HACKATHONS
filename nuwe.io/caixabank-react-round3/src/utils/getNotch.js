/**
 * Returns the appropriate notch clip-path based on card type
 * @param {string} cardType - The type of card (credit, debit, prepaid)
 * @param {boolean} isBack - Whether this is for the back of the card
 * @returns {string} CSS clip-path polygon value
 */
export const getNotch = (cardType, isBack = false) => {
  let notch;
  
  // Define notches for each card type
  switch (cardType) {
    case 'debit':
      notch = 'polygon(100% 0%, 100% 62.84%, 98.18% 66.26%, 97.15% 70%, 97.15% 74.44%, 98.18% 78.14%, 100% 81.53%, 100% 89.55%, 100% 100%, 0% 100%, 0% 70%, 0% 35%, 0% 0%)';
      break;
    case 'credit':
      notch = 'polygon(100% 0%, 100% 62.84%, 97.29% 66.64%, 97.29% 80%, 100% 83.62%, 100% 89.32%, 100% 100%, 0% 100%, 0% 70%, 0% 35%, 0% 0%)';
      break;
    case 'prepaid':
      notch = 'polygon(50% 0%, 100% 0%, 100% 57%, 96.81% 60.84%, 100% 86%, 100% 100%, 0% 100%, 0% 54%, 0% 0%)';
      break;
    default:
      notch = 'polygon(100% 0%, 100% 100%, 0% 100%, 0% 0%)'; // Default rectangle
  }
  
  // Mirror the notch for the back side if needed
  if (isBack) {
    // Replace all X coordinates (swap left and right)
    notch = notch.replace(/(\d+)%/g, (match, p1) => {
      const x = parseInt(p1);
      return x === 0 ? '100%' : x === 100 ? '0%' : (100 - x) + '%';
    });
  }
  
  return notch;
};

export default getNotch;
