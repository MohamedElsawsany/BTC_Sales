
    $(document).ready(function() {
    $('.select2').select2({
        placeholder: 'Select Product',
        allowClear: true,
        width: '100%'
    });

    let rowCount = 1;

    // Add new row
    $('#addRows').click(function() {
    rowCount++;
    const newRow = `
            <tr id="row_${rowCount}">
                <td>
                    <div class="form-check">
                        <input class="form-check-input itemRow" type="checkbox">
                    </div>
                </td>
                <td>
                    <select required name="productId[]" id="productId_${rowCount}" class="form-select select2">
                        <option disabled value="0" selected>Select Product</option>
                    </select>
                </td>
                <td>
                    <input type="number" name="productQty[]" id="productQty_${rowCount}" required
                           onkeyup="calculateTotalByPrice()" class="form-control qty"
                           autocomplete="off" placeholder="0" min="1" step="1">
                </td>
                <td style="display: none">
                    <input readonly required type="text" name="productWeight[]" id="productWeight_${rowCount}">
                </td>
                <td style="display: none">
                    <input readonly required type="text" name="productStamp[]" id="productStamp_${rowCount}">
                </td>
                <td style="display: none">
                    <input readonly required type="text" name="productEnduser[]" id="productEnduser_${rowCount}">
                </td>
                <td>
                    <input type="number" required name="productPrice[]" id="productPrice_${rowCount}"
                           onkeyup="calculateTotalByPrice()" class="form-control"
                           autocomplete="off" placeholder="0.00" step="0.01" min="0">
                </td>
                <td>
                    <input readonly type="number" name="totalQtyProductPrice[]"
                           id="totalQtyProductPrice_${rowCount}" required class="form-control price"
                           autocomplete="off" value="0.00" step="0.01">
                </td>
                <td style="display: none"><input readonly required type="text" name="productNum1[]" id="productNum1_${rowCount}"></td>
                <td style="display: none"><input readonly required type="text" name="productNum2[]" id="productNum2_${rowCount}"></td>
                <td style="display: none"><input readonly required type="text" name="productNum3[]" id="productNum3_${rowCount}"></td>
            </tr>
        `;

    $('#invoiceProducts tbody').append(newRow);
    $(`#productId_${rowCount}`).select2({
    placeholder: 'Select Product',
    allowClear: true,
    width: '100%'
});
});

    // Remove selected rows
    $('#removeRows').click(function() {
    $('.itemRow:checked').each(function() {
    $(this).closest('tr').remove();
});
    calculateTotalByPrice();
});

    // Check all functionality
    $('#checkAll').change(function() {
    $('.itemRow').prop('checked', this.checked);
});

    // Update check all when individual checkboxes change
    $(document).on('change', '.itemRow', function() {
    const totalCheckboxes = $('.itemRow').length;
    const checkedCheckboxes = $('.itemRow:checked').length;
    $('#checkAll').prop('checked', totalCheckboxes === checkedCheckboxes);
});
});