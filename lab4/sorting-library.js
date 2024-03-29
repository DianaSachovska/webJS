var SortingLibrary = {
    bubbleSort: function (array, ascending = true) {
        let comparisons = 0;
        let swaps = 0;
        let n = array.length;
        if (array.includes(undefined)) {
            console.warn("Warning: The array contains undefined elements. Sorting may produce unexpected results.");
        }
    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            if (array[j] === undefined && array[j + 1] !== undefined) {
                let temp = array[j];
                array[j] = array[j + 1];
                array[j + 1] = temp;
                swaps++;
            } else if (array[j] !== undefined && array[j + 1] !== undefined && (ascending ? array[j] > array[j + 1] : array[j] < array[j + 1])) {
                let temp = array[j];
                array[j] = array[j + 1];
                array[j + 1] = temp;
                swaps++;
            }
            comparisons++;
        }
    }

        console.log('Bubble sort - Comparisons:', comparisons, 'Swaps:', swaps);
        console.log('[Bubble sort] Sorted array:', array);
    },

    selectionSort: function (array, ascending = true) {
        let comparisons = 0;
        let swaps = 0;
        if (array.includes(undefined)) {
            console.warn("Warning: The array contains undefined elements. Sorting may produce unexpected results.");
        }
        for (let i = 0; i < array.length - 1; i++) {
            let minIndex = i;
            for (let j = i + 1; j < array.length; j++) {
                comparisons++;
                if (array[j] !== undefined && (array[minIndex] === undefined || (ascending ? array[j] < array[minIndex] : array[j] > array[minIndex]))) {
                    minIndex = j;
                }
            }
            if (minIndex !== i) {
                let temp = array[i];
                array[i] = array[minIndex];
                array[minIndex] = temp;
                swaps++;
            }
        }

        console.log('Selection sort - Comparisons:', comparisons, 'Swaps:', swaps);
        console.log('[Selection sort] Sorted array:', array);
    },

    insertionSort: function (array, ascending = true) {
        let comparisons = 0;
        let swaps = 0;
        if (array.includes(undefined)) {
            console.warn("Warning: The array contains undefined elements. Sorting may produce unexpected results.");
        }
        for (let i = 1; i < array.length; i++) {
            let current = array[i];
            let j = i - 1;
            while (j >= 0 && (array[j] === undefined || (ascending ? array[j] > current : array[j] < current))) {
                comparisons++;
                array[j + 1] = array[j];
                j--;
                swaps++;
            }
            array[j + 1] = current;
        }

        console.log('Insertion sort - Comparisons:', comparisons, 'Swaps:', swaps);
        console.log('[Insertion sort] Sorted array:', array);
    },

    shellSort: function (array, ascending = true) {
        let comparisons = 0;
        let swaps = 0;
        let n = array.length;
        if (array.includes(undefined)) {
            console.warn("Warning: The array contains undefined elements. Sorting may produce unexpected results.");
        }
        for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
            for (let i = gap; i < n; i++) {
                let temp = array[i];
                let j = i;
                while (j >= gap && (array[j - gap] === undefined || (ascending ? array[j - gap] > temp : array[j - gap] < temp))) {
                    comparisons++;
                    array[j] = array[j - gap];
                    j -= gap;
                    swaps++;
                }
                array[j] = temp;
            }
        }

        console.log('Shell sort - Comparisons:', comparisons, 'Swaps:', swaps);
        console.log('[Shell sort] Sorted array:', array);
    },

    quickSort: function (array, ascending = true) {
        let comparisons = 0;
        let swaps = 0;
        if (array.includes(undefined)) {
            console.warn("Warning: The array contains undefined elements. Sorting may produce unexpected results.");
        }
        function partition(arr, low, high) {
            let pivot = arr[high];
            let i = low - 1;
            for (let j = low; j < high; j++) {
                comparisons++;
                if (arr[j] !== undefined && (pivot === undefined || (ascending ? arr[j] < pivot : arr[j] > pivot))) {
                    i++;
                    let temp = arr[i];
                    arr[i] = arr[j];
                    arr[j] = temp;
                    swaps++;
                }
            }
            let temp = arr[i + 1];
            arr[i + 1] = arr[high];
            arr[high] = temp;
            swaps++;
            return i + 1;
        }

        function quickSortHelper(arr, low, high) {
            if (low < high) {
                let pi = partition(arr, low, high);
                quickSortHelper(arr, low, pi - 1);
                quickSortHelper(arr, pi + 1, high);
            }
        }

        quickSortHelper(array, 0, array.length - 1);

        console.log('Quick sort - Comparisons:', comparisons, 'Swaps:', swaps);
        console.log('[Quick sort] Sorted array:', array);
    }
};