import { getLastUnsafe, swapUnsafe } from '@/lib/array';
import { SortHistory } from '@/types/sortHistory';

/**
 * 初期ステップを生成します。
 *
 * 与えられた数値配列のスナップショットを取り、
 * 比較・入れ替え・ソート済みインデックスが空の状態で
 * ステップ0の履歴を含む `SortHistory` を返します。
 *
 * @param array - ソート対象の数値配列（変更されません）
 * @returns ステップ0のみを含む `SortHistory`
 * @example
 * const history = initializeSteps([3, 1, 2]);
 * // history[0].array => [3, 1, 2]
 * // history[0].step => 0
 */
export const initializeSteps = (array: number[]): SortHistory => {
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
 * 比較中インデックスを履歴に追加します。
 *
 * 直近ステップを基に、`comparing` に `[i, j]` を設定し、
 * ステップ番号を +1 した新しいステップを末尾に追加します。
 *
 * @param historySteps - 既存のソート履歴
 * @param i - 比較する最初のインデックス
 * @param j - 比較する二番目のインデックス
 * @returns 新しいステップが追加された `SortHistory`
 */
export const addToComparing = (
  historySteps: SortHistory,
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
 * ソート済みインデックスを履歴に追加します。
 *
 * 直近ステップの `sorted` に `indexes` を追記し、
 * ステップ番号を +1 した新しいステップを末尾に追加します。
 *
 * @param historySteps - 既存のソート履歴
 * @param indexes - 新たにソート済みとして扱うインデックス配列
 * @returns 新しいステップが追加された `SortHistory`
 */
export const addToSorted = (historySteps: SortHistory, indexes: number[]) => {
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
 * 入れ替えインデックスを履歴に追加し、配列を入れ替えます。
 *
 * 直近ステップを基に、`swapping` に `[i, j]` を設定、
 * `comparing` をクリアし、`array` を `i` と `j` を入れ替えた配列に更新して、
 * ステップ番号を +1 した新しいステップを末尾に追加します。
 *
 * @param historySteps - 既存のソート履歴
 * @param i - 入れ替える最初のインデックス
 * @param j - 入れ替える二番目のインデックス
 * @returns 新しいステップが追加された `SortHistory`
 */
export const addToSwapping = (
  historySteps: SortHistory,
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
 * 比較・入れ替え状態をクリアします。
 *
 * 直近ステップを基に、`swapping` と `comparing` を空にして、
 * ステップ番号を +1 した新しいステップを末尾に追加します。
 * 配列とソート済みインデックスは変更しません。
 *
 * @param historySteps - 既存のソート履歴
 * @returns 新しいステップが追加された `SortHistory`
 */
export const cleanStatuses = (historySteps: SortHistory) => {
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
