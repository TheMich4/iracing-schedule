import { licenseGroupMap } from "~/utils/license";

export const LicenseGroupCell = ({ getValue }) => {
  const license = licenseGroupMap[getValue()] as {
    name: string;
    color: string;
    short: string;
  };

  return (
    <div className="flex w-full justify-center">
      <span className={`px-1 bg-${license.color} rounded-sm text-white`}>
        {license.short}
      </span>
    </div>
  );
};
