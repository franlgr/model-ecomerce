<template>
    <div class="overflow-x-auto">
        <table class="table">
            <!-- head -->
            <thead>
                <tr>
                    <th>
                        <label>
                    <input type="checkbox" class="checkbox" />
                  </label>
                    </th>
                    <th>Name</th>
                    <th>Job</th>
                    <th>Favorite Color</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <!-- row 1 -->
                <tr>
                    <th>
                        <label>
                    <input type="checkbox" class="checkbox" />
                  </label>
                    </th>
                    <td>
                        <div class="flex items-center space-x-3">
                            <div class="avatar">
                                <div class="mask mask-squircle w-12 h-12">
                                    <img src="https://picsum.photos/300/300" alt="Avatar Tailwind CSS Component" />
                                </div>
                            </div>
                            <div>
                                <div class="font-bold">Hart Hagerty</div>
                                <div class="text-sm opacity-50">United States</div>
                            </div>
                        </div>
                    </td>
                    <td>
                        Zemlak, Daniel and Leannon
                        <br/>
    
                    </td>
                    <td>Purple</td>
                    <th>
                        <button class="btn btn-sm border-solid border-black bg-green-400">show</button>
                        <button class="btn btn-sm border-solid border-black bg-blue-400 mx-2">edit</button>
                        <button class="btn btn-sm border-solid border-black bg-red-400">delete</button>
                    </th>
                </tr>
            </tbody>
            <!-- foot -->
            <!-- <tfoot>
                                    <tr>
                                        <th></th>
                                        <th>Name</th>
                                        <th>Job</th>
                                        <th>Favorite Color</th>
                                        <th></th>
                                    </tr>
                                </tfoot> -->
    
        </table>
    </div>
</template>
