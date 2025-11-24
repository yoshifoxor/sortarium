import { SortHistoryStep } from '@/types';
import { getLastUnsafe, swapUnsafe } from '@/utils/array';

/**
 * ソートアルゴリズムの初期ステップを作成する
 * @param {number[]} array - ソート対象の配列
 * @returns {SortHistoryStep[]} 初期ステップを含む履歴配列
 */
export const initializeSteps = (array: number[]): SortHistoryStep[] => {
  return [
    {
      array: [...array],
      sorted: [],
      swapping: [],
      comparing: [],
      step: 0,
    },
  ];
};

/**
 * 比較中の要素を記録した新しいステップを追加する
 * @param {SortHistoryStep[]} historySteps - これまでのソート履歴
 * @param {number} i - 比較する最初の要素のインデックス
 * @param {number} j - 比較する2番目の要素のインデックス
 * @returns {SortHistoryStep[]} 更新された履歴配列
 */
export const addToComparing = (
  historySteps: SortHistoryStep[],
  i: number,
  j: number,
) => {
  const last = getLastUnsafe(historySteps);

  return [
    ...historySteps,
    {
      ...last,
      comparing: [i, j],
      step: last.step + 1,
    },
  ];
};

/**
 * ソート済みとして要素をマークした新しいステップを追加する
 * @param {SortHistoryStep[]} historySteps - これまでのソート履歴
 * @param {number[]} indexes - ソート済みとしてマークする要素のインデックス配列
 * @returns {SortHistoryStep[]} 更新された履歴配列
 */
export const addToSorted = (
  historySteps: SortHistoryStep[],
  indexes: number[],
) => {
  const last = getLastUnsafe(historySteps);

  return [
    ...historySteps,
    {
      ...last,
      sorted: [...last.sorted, ...indexes],
      step: last.step + 1,
    },
  ];
};

/**
 * 要素の交換を記録した新しいステップを追加する
 * @param {SortHistoryStep[]} historySteps - これまでのソート履歴
 * @param {number} i - 交換する最初の要素のインデックス
 * @param {number} j - 交換する2番目の要素のインデックス
 * @returns {SortHistoryStep[]} 更新された履歴配列（交換後の配列を含む）
 */
export const addToSwapping = (
  historySteps: SortHistoryStep[],
  i: number,
  j: number,
) => {
  const last = getLastUnsafe(historySteps);

  return [
    ...historySteps,
    {
      ...last,
      comparing: [],
      swapping: [i, j],
      array: [...swapUnsafe(last.array, i, j)],
      step: last.step + 1,
    },
  ];
};

/**
 * 比較中・交換中のステータスをクリアした新しいステップを追加する
 * @param {SortHistoryStep[]} historySteps - これまでのソート履歴
 * @returns {SortHistoryStep[]} ステータスがクリアされた履歴配列
 */
export const cleanStatuses = (historySteps: SortHistoryStep[]) => {
  const last = getLastUnsafe(historySteps);

  return [
    ...historySteps,
    {
      ...last,
      swapping: [],
      comparing: [],
      step: last.step + 1,
    },
  ];
};
