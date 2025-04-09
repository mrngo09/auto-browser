import * as fs from "fs";
import * as XLSX from "xlsx";

// Khai báo type cho dữ liệu
interface Account {
  code_bank: string;
  account_name: string;
  account_no: string;
  branch_name: string;
}

interface BankRow {
  smartpay_code: string;
  bank_code: string;
  bank_name: string;
  statement_time: any[];
  account: Account[] | null;
  tl: number;
  order_navigate: number;
}

interface ExportRow extends Partial<Account> {
  smartpay_code: string;
  bank_code: string;
  bank_name: string;
  tl: number;
  order_navigate: number;
}

export function exportToExcel(data: any) {
  // Tạo mảng dữ liệu để xuất Excel
  const exportRows: ExportRow[] = [];

  (data.rows as BankRow[]).forEach((bank) => {
    const baseInfo = {
      smartpay_code: bank.smartpay_code,
      bank_code: bank.bank_code,
      bank_name: bank.bank_name,
      tl: bank.tl,
      order_navigate: bank.order_navigate,
    };

    if (Array.isArray(bank.account) && bank.account.length > 0) {
      bank.account.forEach((acc) => {
        exportRows.push({
          ...baseInfo,
          code_bank: acc.code_bank,
          account_name: acc.account_name,
          account_no: acc.account_no,
          branch_name: acc.branch_name,
        });
      });
    } else {
      exportRows.push(baseInfo);
    }
  });

  // Tạo workbook và worksheet
  const ws = XLSX.utils.json_to_sheet(exportRows);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Banks");

  // Xuất file
  XLSX.writeFile(wb, "bank_data_export.xlsx");

  console.log("✅ Xuất Excel thành công: bank_data_export.xlsx");
}
