"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

const formSchemaOther = z.object({
    companyname: z.string().min(2).max(50),
    phonearea: z.string().min(2).max(50),
    phonenumber: z.string().min(2).max(50),
    companylocation: z.string().min(2).max(50),
    billlocation: z.string().min(2).max(50),
    producttype: z.string().min(2).max(50),
})

const formSchemaCus = z.object({
    companyname: z.string().min(2).max(50),
    phonearea: z.string().min(2).max(50),
    phonenumber: z.string().min(2).max(50),
    companylocation: z.string().min(2).max(50),
    billlocation: z.string().min(2).max(50),
    producttype: z.string().min(2).max(50),
    weight: z.number().gte(200).lte(10000),
    width: z.number().gte(1000).lte(2000),
    depth: z.number().gte(1000).lte(2500),
})

const formSchema = z.union([formSchemaCus, formSchemaOther])

export default function Page() {
    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            companyname: "",
            phonearea: "",
            phonenumber: "",
            companylocation: "",
            billlocation: "",
            producttype: "",
            weight: 0,
            width: 0,
            depth: 0
        },
    })

    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                {/* 公司姓名 必填。
                    电话区号 必填。必须是合法的国际电话区号。
                    电话号码 必填。必须是⼀串数字。
                    公司地址 必填。
                    账单地址 需询问是否与公司地址相同。若否，则需要填写，否则⽆需填写。
                    产品类型 */}
                <FormField
                    control={form.control}
                    name="companyname"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>公司姓名</FormLabel>
                            <FormControl>
                                <Input placeholder="请输入公司名称" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>

                    )}
                />
                <FormField
                    control={form.control}
                    name="phonearea"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>电话区号</FormLabel>
                            <FormControl>
                                <Input placeholder="请输入电话区号" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>

                    )}
                />
                <FormField
                    control={form.control}
                    name="phonenumber"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>电话号码</FormLabel>
                            <FormControl>
                                <Input placeholder="请输入电话号码" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>

                    )}
                />
                <FormField
                    control={form.control}
                    name="companylocation"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>公司地址</FormLabel>
                            <FormControl>
                                <Input placeholder="请输入公司地址" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>

                    )}
                />
                <FormField
                    control={form.control}
                    name="billlocation"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>账单地址</FormLabel>
                            <FormControl>
                                <Input placeholder="请输入账单地址" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>

                    )}
                />
                <FormField
                    control={form.control}
                    name="producttype"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>产品类型</FormLabel>
                            <FormControl>
                                <Select onValueChange={(value: String) => field.onChange(value)}>
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder="选择产品类型" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>类型</SelectLabel>
                                            <SelectItem value="customer">客梯</SelectItem>
                                            <SelectItem value="autoup">自动扶梯</SelectItem>
                                            <SelectItem value="autowalk">自动人行道</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </FormControl>
                            <FormMessage />
                        </FormItem>

                    )}
                />
                {form.watch('producttype') == 'customer' && <FormField
                    control={form.control}
                    name="weight"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>载重（千克）</FormLabel>
                            <FormControl>
                                <Select onValueChange={(value: String) => field.onChange(Number(value))}>
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder="选择载重（千克）" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            {/* <SelectLabel>类型</SelectLabel> */}
                                            <SelectItem value="630">630</SelectItem>
                                            <SelectItem value="1000">1000</SelectItem>
                                            <SelectItem value="1250">1250</SelectItem>
                                            <Input placeholder="自定义载重" {...field} />
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </FormControl>
                            <FormMessage />
                        </FormItem>

                    )}
                />}
                {form.watch('producttype') == 'customer' && <FormField
                    control={form.control}
                    name="width"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>轿厢宽度（毫⽶）</FormLabel>
                            <FormControl>
                                <Select onValueChange={(value: String) => field.onChange(Number(value))}>
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder="选择轿厢宽度（毫⽶）" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            {/* <SelectLabel>类型</SelectLabel> */}
                                            {form.watch('weight') == 630 && <SelectItem value="1100">1100</SelectItem>}
                                            {form.watch('weight') == (1000 | 1250) && <SelectItem value="1200">1200</SelectItem>}
                                            {form.watch('weight') == 1250 && <SelectItem value="1600">1600</SelectItem>}
                                            <Input placeholder="自定义轿厢宽度（毫⽶）（1000-2000）" {...field} />
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </FormControl>
                            <FormMessage />
                        </FormItem>

                    )}
                />}
                {form.watch('producttype') == 'customer' && <FormField
                    control={form.control}
                    name="depth"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>轿厢深度（毫⽶）</FormLabel>
                            <FormControl>
                                <Select onValueChange={(value: String) => field.onChange(Number(value))}>
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder="选择轿厢深度（毫⽶）" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            {/* <SelectLabel>类型</SelectLabel> */}
                                            {(form.watch('weight') == 630 || (form.watch('weight') == 1250 && form.watch('width') == 1600)) && <SelectItem value="1400">1400</SelectItem>}
                                            {(form.watch('weight') == 1000 || (form.watch('weight') == 1250 && form.watch('width') == 1200)) && <SelectItem value="2100">2100</SelectItem>}
                                            <Input placeholder="自定义轿厢深度（毫⽶）（1000-2500）" {...field} />
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </FormControl>
                            <FormMessage />
                        </FormItem>

                    )}
                />}
                <Button type="submit">Submit</Button>
            </form>
        </Form>
    )

}