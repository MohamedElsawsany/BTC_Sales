// *put 1 if product carta 21k and if product carta 24k put 999.9 *
// *put 1 if product carta 21k and if product carta 24k put 875 *

    const sale_btc_products = [
    {name: "جنيه ذهب", weight: 8, stamp: 0, enduser: 0, num1: 1, num2: 1, num3: 0},
    {name: "ربع جنيه ذهب", weight: 2, stamp: 0, enduser: 0, num1: 1, num2: 1, num3: 0},
    {name: "نص جنيه ذهب", weight: 4, stamp: 0, enduser: 0, num1: 1, num2: 1, num3: 0}
    ];

    function formatMoney(value) {
    return Number(value).toLocaleString('en-US');
}

    function parseNumber(value) {
    return parseFloat((value || "0").toString().replace(/,/g, ''));
}

    let rowCount = 1;

    function populateProductSelect(select) {
    select.innerHTML = `<option disabled value="0" selected>Select Product</option>`;
    sale_btc_products.forEach((product, index) => {
    const option = document.createElement("option");
    option.value = index + 1;
    option.textContent = product.name;
    select.appendChild(option);
});
}

    document.addEventListener('DOMContentLoaded', () => {
    populateProductSelect(document.getElementById('productId_1'));
});

    document.addEventListener('change', function (e) {
    if (e.target && e.target.matches("select[name='productId[]']")) {
    const select = e.target;
    const rowId = select.id.split('_')[1];
    const selectedIndex = select.selectedIndex - 1;

    if (selectedIndex >= 0 && selectedIndex < sale_btc_products.length) {
    const selectedProduct = sale_btc_products[selectedIndex];

    document.getElementById(`productWeight_${rowId}`).value = selectedProduct.weight;
    document.getElementById(`productStamp_${rowId}`).value = selectedProduct.stamp;
    document.getElementById(`productEnduser_${rowId}`).value = selectedProduct.enduser;
    document.getElementById(`productNum1_${rowId}`).value = selectedProduct.num1;
    document.getElementById(`productNum2_${rowId}`).value = selectedProduct.num2;
    document.getElementById(`productNum3_${rowId}`).value = selectedProduct.num3;

    calculateTotal();
}
}
});

    document.getElementById('addRows').addEventListener('click', function () {
    rowCount++;
    const tableBody = document.querySelector('#invoiceProducts tbody');
    const newRow = `
            <tr>
                <td><div class="checkbox-container"><input class="itemRow form-check-input" type="checkbox"></div></td>
                <td>
                    <select required name="productId[]" id="productId_${rowCount}" class="form-select">
                        <option disabled value="0" selected>Select Product</option>
                    </select>
                </td>
                <td><input type="number" name="productQty[]" id="productQty_${rowCount}" required onkeyup="calculateTotal()" class="form-control qty" autocomplete="off" placeholder="Qty" min="1"></td>
                <td style="display: none"><input type="text" readonly name="productWeight[]" id="productWeight_${rowCount}" required class="form-control" autocomplete="off"></td>
                <td style="display: none"><input type="text" readonly name="productStamp[]" id="productStamp_${rowCount}" required class="form-control" autocomplete="off"></td>
                <td style="display: none"><input type="text" readonly name="productEnduser[]" id="productEnduser_${rowCount}" required class="form-control" autocomplete="off"></td>
                <td><input type="text" required name="productPrice[]" id="productPrice_${rowCount}" onkeyup="calculateTotalByPrice()" class="form-control" autocomplete="off" placeholder="Price"></td>
                <td><input readonly type="text" name="totalQtyProductPrice[]" id="totalQtyProductPrice_${rowCount}" required class="form-control price total-input" autocomplete="off"></td>
                <td style="display: none"><input readonly required type="text" name="productNum1[]" id="productNum1_${rowCount}"></td>
                <td style="display: none"><input readonly required type="text" name="productNum2[]" id="productNum2_${rowCount}"></td>
                <td style="display: none"><input readonly required type="text" name="productNum3[]" id="productNum3_${rowCount}"></td>
            </tr>
        `;
    tableBody.insertAdjacentHTML('beforeend', newRow);

    // فقط املى select الصف الجديد
    const newSelect = document.getElementById(`productId_${rowCount}`);
    populateProductSelect(newSelect);
});

    document.getElementById('removeRows').addEventListener('click', function () {
    document.querySelectorAll('.itemRow:checked').forEach(checkbox => {
        checkbox.closest('tr').remove();
    });
    calculateTotal();
});

    document.getElementById('checkAll').addEventListener('change', function () {
    const checked = this.checked;
    document.querySelectorAll('.itemRow').forEach(cb => cb.checked = checked);
});

    function calculateTotalByPrice() {
    let totalAmount = 0;
    document.querySelectorAll("[id^='productQty_']").forEach(function (element) {
    const id = element.id.split('_')[1];
    const qty = parseNumber(document.getElementById(`productQty_${id}`).value);
    const price = parseNumber(document.getElementById(`productPrice_${id}`).value);
    const total = price * qty;

    document.getElementById(`totalQtyProductPrice_${id}`).value = formatMoney(total);
    totalAmount += total;
});
    document.getElementById('subTotal').value = formatMoney(totalAmount);
}

    function function1() {
    let totalAmount = 0;
    document.querySelectorAll("[id^='productQty_']").forEach(function (element) {
    const id = element.id.split('_')[1];
    const weight = parseNumber(document.getElementById(`productWeight_${id}`).value);
    const stamp = parseNumber(document.getElementById(`productStamp_${id}`).value);
    const enduser = parseNumber(document.getElementById(`productEnduser_${id}`).value);
    const goldprice = parseNumber(document.getElementById('goldPrice').value);
    const quantity = parseNumber(document.getElementById(`productQty_${id}`).value);
    const num1 = parseNumber(document.getElementById(`productNum1_${id}`).value) || 1;
    const num2 = parseNumber(document.getElementById(`productNum2_${id}`).value) || 1;
    const num3 = parseNumber(document.getElementById(`productNum3_${id}`).value);

    if (quantity > 0) {
    let soso = num1 / num2;
    let unitPrice = goldprice * soso + stamp + enduser;
    let total = weight * quantity * unitPrice + num3;
    let itemPrice = total / quantity;

    document.getElementById(`productPrice_${id}`).value = formatMoney(itemPrice);
    document.getElementById(`totalQtyProductPrice_${id}`).value = formatMoney(total);
    totalAmount += total;
}
});
    document.getElementById('subTotal').value = formatMoney(totalAmount);
}

    function function2() {
    const goldprice = parseNumber(document.getElementById('goldPrice').value);
    const price24 = goldprice * (999.9 / 875);
    document.getElementById('goldPrice24').value = formatMoney(price24.toFixed(2));
}

    function calculateTotal() {
    function1();
    function2();
}

    document.addEventListener('input', function (e) {
    const targets = ['goldPrice', 'goldPrice24', 'subTotal'];
    if (
    e.target.id.startsWith("productPrice_") ||
    e.target.id.startsWith("totalQtyProductPrice_") ||
    targets.includes(e.target.id)
    ) {
    let value = e.target.value.replace(/,/g, '');
    if (!isNaN(value) && value !== "") {
    e.target.value = formatMoney(value);
}
}
});