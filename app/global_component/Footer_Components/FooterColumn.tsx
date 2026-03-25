import Link from "next/link";

interface navButton{
    label: string;
    href: string;
}
interface NavColumn{
    header : string,
    columnItems: navButton[]
}

export default  function FooterColumn(col: NavColumn){

    return (<div className="mb-8">
            <h4 className="text-base font-semibold text-gray-900 mb-2.5">{col.header}</h4>
                <ul className="space-y-2">
                    {col.columnItems.map((item, i) => (
                    <li key={i}>
                        <Link className="text-sm text-gray-600 hover:text-[#0056A3] transition-colors" href={item.href} >{item.label}</Link>
                    </li>
                    ))}
                </ul>
            </div>

    );
}